from ultralytics import YOLO
import tempfile
from PIL import Image
import io

# Load YOLO model
model = YOLO("model/best.pt")

# COCO class names or your custom model's class names
CLASS_NAMES = model.names  # dict: {0: 'person', 1: 'car', ...}

async def detect_objects(image_bytes: bytes):
    # Simpan gambar sementara
    with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as temp_file:
        temp_file.write(image_bytes)
        temp_path = temp_file.name

    results = model(temp_path)

    detections = []
    for r in results:
        for box in r.boxes:
            x1, y1, x2, y2 = box.xyxy[0].tolist()
            width = x2 - x1
            height = y2 - y1
            cls_id = int(box.cls[0])
            detections.append({
                "label": CLASS_NAMES[cls_id],
                "confidence": float(box.conf[0]),
                "x": int(x1),
                "y": int(y1),
                "width": int(width),
                "height": int(height)
            })

    return {
        "detections": detections
    }
