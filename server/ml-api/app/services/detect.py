import os
import tempfile
from PIL import Image
import io
import json
import numpy as np

# Load deskripsi objek untuk YOLO model
DESCRIPTION_FILE = os.path.join(os.path.dirname(__file__), "..", "deskripsi_objek_yolo.json")
with open(DESCRIPTION_FILE, "r", encoding="utf-8") as f:
    deskripsi_objek = json.load(f)

# Coba load YOLO model
MODEL_PATH = os.path.join("model", "best.pt")
yolo_model = None

try:
    if os.path.exists(MODEL_PATH):
        from ultralytics import YOLO
        yolo_model = YOLO(MODEL_PATH)
        print("✅ YOLO model berhasil dimuat")
    else:
        print("⚠️ YOLO model tidak ditemukan, menggunakan simulasi")
except Exception as e:
    print(f"⚠️ Error loading YOLO model: {e}, menggunakan simulasi")

async def detect_objects(image_bytes: bytes):
    """
    Deteksi objek artefak museum menggunakan YOLO model
    Mendeteksi 11 objek yang dilatih dalam model (ID 0-10)
    Urutan: Al-Qur'an, Dulang, Lampu Minyak, Miniatur Buho', Miniatur Gampiri,
            Miniatur Kataba, Miniatur Palava, Miniatur Tambi, Setrika, Tempayan Kubur, Wadah Kubur
    """
    try:
        # Konversi ke PIL Image
        image = Image.open(io.BytesIO(image_bytes))
        print(f"🖼️ Processing image: {image.size}")
        
        if yolo_model is not None:
            # Gunakan YOLO model yang sebenarnya dengan ukuran input 640x640
            with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as temp_file:
                # Resize image to 640x640 before detection
                image_resized = image.resize((640, 640))
                image_resized.save(temp_file, format='JPEG')
                temp_path = temp_file.name

            print(f"🔄 Running YOLO inference on {temp_path}")
            results = yolo_model(temp_path, conf=0.5, imgsz=640)  # Confidence threshold 50%, image size 640
            
            detections = []
            for r in results:
                if r.boxes is not None:
                    for box in r.boxes:
                        x1, y1, x2, y2 = box.xyxy[0].tolist()
                        cls_id = int(box.cls[0])
                        confidence = float(box.conf[0])
                        
                        # Pastikan class_id dalam range yang valid untuk YOLO model (0-10)
                        if 0 <= cls_id <= 10:
                            info = deskripsi_objek.get(str(cls_id), {})
                            nama = info.get("nama", f"Objek {cls_id}")
                            
                            # Scale coordinates back to original image size
                            original_width, original_height = image.size
                            scale_x = original_width / 640
                            scale_y = original_height / 640
                            
                            scaled_x1 = int(x1 * scale_x)
                            scaled_y1 = int(y1 * scale_y)
                            scaled_x2 = int(x2 * scale_x)
                            scaled_y2 = int(y2 * scale_y)
                            
                            detection = {
                                "name": nama,
                                "class": nama,
                                "class_id": cls_id,
                                "confidence": confidence,
                                "score": confidence,
                                "x": scaled_x1,
                                "y": scaled_y1,
                                "width": scaled_x2 - scaled_x1,
                                "height": scaled_y2 - scaled_y1,
                                "bbox": [scaled_x1, scaled_y1, scaled_x2 - scaled_x1, scaled_y2 - scaled_y1]
                            }
                            detections.append(detection)
                            print(f"  📍 Detected: {nama} at ({scaled_x1},{scaled_y1}) conf={confidence:.2f}")
            
            # Hapus file temporary
            os.unlink(temp_path)
            print(f"✅ Detection completed: {len(detections)} objects found")
            
        else:
            # Simulasi deteksi yang realistis
            print("⚠️ Using simulation mode")
            detections = simulate_realistic_detection(image)

        return {
            "detections": detections,
            "objects": detections,  # Alias untuk kompatibilitas frontend
            "count": len(detections)
        }
        
    except Exception as e:
        print(f"❌ Error in detect_objects: {e}")
        import traceback
        traceback.print_exc()
        return {
            "detections": [],
            "objects": [],
            "count": 0,
            "error": str(e)
        }

def simulate_realistic_detection(image):
    """
    Simulasi deteksi objek yang realistis untuk YOLO model
    Return objek museum yang valid (ID 0-10)
    """
    import random
    
    width, height = image.size
    detections = []
    
    print(f"🖼️ Processing image: {width}x{height}")
    
    # Simulasi 0-2 objek terdeteksi (realistis)
    num_objects = random.choices([0, 1, 2], weights=[0.2, 0.6, 0.2])[0]
    print(f"🎯 Simulating {num_objects} objects")
    
    for i in range(num_objects):
        # Pilih class_id yang valid untuk YOLO model (0-10)
        class_id = random.randint(0, 10)
        info = deskripsi_objek.get(str(class_id), {})
        nama = info.get("nama", f"Objek {class_id}")
        
        # Generate bounding box yang realistis (dalam koordinat absolut)
        margin = 50
        x = random.randint(margin, max(margin + 1, width - 200))
        y = random.randint(margin, max(margin + 1, height - 200))
        w = random.randint(100, min(300, width - x - margin))
        h = random.randint(100, min(300, height - y - margin))
        
        # Pastikan bounding box tidak keluar dari gambar
        if x + w > width:
            w = width - x - 10
        if y + h > height:
            h = height - y - 10
        
        confidence = random.uniform(0.65, 0.92)
        
        detection = {
            "name": nama,
            "class": nama,
            "class_id": class_id,
            "confidence": confidence,
            "score": confidence,
            "x": x,
            "y": y,
            "width": w,
            "height": h,
            "bbox": [x, y, w, h]
        }
        
        detections.append(detection)
        print(f"  📍 {nama}: ({x},{y}) {w}x{h} conf={confidence:.2f}")
    
    return detections
