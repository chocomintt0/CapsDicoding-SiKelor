import tensorflow as tf
import numpy as np
from PIL import Image
import io
import json
import os

# Load deskripsi objek untuk TensorFlow model
DESCRIPTION_FILE = os.path.join(os.path.dirname(__file__), "..", "deskripsi_objek_tensorflow.json")
with open(DESCRIPTION_FILE, "r", encoding="utf-8") as f:
    deskripsi_objek = json.load(f)

# Coba load model klasifikasi
MODEL_PATH = os.path.join("model", "model_sikelor.h5")
model = None

try:
    if os.path.exists(MODEL_PATH):
        model = tf.keras.models.load_model(MODEL_PATH)
        print("✅ Model klasifikasi TensorFlow berhasil dimuat")
    else:
        print("⚠️ Model klasifikasi tidak ditemukan, menggunakan simulasi")
except Exception as e:
    print(f"⚠️ Error loading model: {e}, menggunakan simulasi")

async def classify_image(image_bytes: bytes):
    """
    Klasifikasi gambar artefak museum menggunakan TensorFlow model
    Mengenali 9 objek yang dilatih (ID 0-8)
    Urutan: Al-Qur'an, Dulang, Miniatur Buho', Miniatur Gampiri, 
           Miniatur Kataba, Miniatur Palava, Miniatur Tambi, Tempayan Kubur, Wadah Kubur
    """
    try:
        # Proses gambar
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        
        if model is not None:
            # Gunakan model yang sebenarnya dengan ukuran input 640x640
            image_resized = image.resize((640, 640))
            image_array = np.array(image_resized) / 255.0
            image_array = np.expand_dims(image_array, axis=0)

            # Prediksi
            predictions = model.predict(image_array)[0]
            predicted_class = int(np.argmax(predictions))
            confidence = float(np.max(predictions))
            
            # Filter confidence rendah
            if confidence < 0.5:
                return {
                    "class_id": -1,
                    "confidence": confidence,
                    "nama": "Objek Tidak Dikenali",
                    "deskripsi": "Objek ini tidak termasuk dalam koleksi museum yang dapat dikenali sistem."
                }
        else:
            # Simulasi realistis untuk testing
            predicted_class, confidence = simulate_realistic_classification(image)
        
        # Pastikan class_id dalam range yang valid untuk TensorFlow model (0-8)
        if predicted_class < 0 or predicted_class > 8:
            return {
                "class_id": -1,
                "confidence": 0.0,
                "nama": "Objek Tidak Dikenali",
                "deskripsi": "Objek ini tidak termasuk dalam koleksi museum yang dapat dikenali sistem."
            }

        # Ambil informasi dari JSON TensorFlow
        info = deskripsi_objek.get(str(predicted_class), {})
        nama = info.get("nama", "Tidak diketahui")
        deskripsi = info.get("deskripsi", "Deskripsi tidak tersedia.")

        return {
            "class_id": predicted_class,
            "confidence": confidence,
            "nama": nama,
            "deskripsi": deskripsi
        }
        
    except Exception as e:
        print(f"Error in classify_image: {e}")
        return {
            "class_id": -1,
            "confidence": 0.0,
            "nama": "Error",
            "deskripsi": f"Terjadi error dalam klasifikasi: {str(e)}"
        }

def simulate_realistic_classification(image):
    """
    Simulasi klasifikasi yang realistis untuk TensorFlow model
    Return objek yang memang ada di museum (ID 0-8)
    """
    import random
    
    # Simulasi berdasarkan karakteristik gambar
    width, height = image.size
    
    # Hitung "kompleksitas" gambar sebagai proxy untuk jenis objek
    image_array = np.array(image.convert('L'))  # Grayscale
    complexity = np.std(image_array) / 255.0
    
    # Mapping berdasarkan kompleksitas (simulasi) untuk TensorFlow model
    if complexity > 0.3:
        # Objek dengan detail tinggi (miniatur rumah, dll)
        possible_classes = [2, 3, 4, 5, 6]  # Miniatur (TensorFlow order)
        confidence_range = (0.75, 0.92)
    elif complexity > 0.2:
        # Objek dengan tekstur (dulang, tempayan)
        possible_classes = [1, 7, 8]  # Peralatan dan wadah (TensorFlow order)
        confidence_range = (0.65, 0.85)
    else:
        # Objek dengan pola (Al-Qur'an)
        possible_classes = [0]  # Naskah (TensorFlow order)
        confidence_range = (0.55, 0.78)
    
    predicted_class = random.choice(possible_classes)
    confidence = random.uniform(*confidence_range)
    
    return predicted_class, confidence
