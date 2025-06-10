import tensorflow as tf
import numpy as np
from PIL import Image
import io
import json
import os

# Load model klasifikasi .h5
model_path = os.path.join("model", "model_sikelor.h5")
model = tf.keras.models.load_model(model_path)

# Load deskripsi objek
with open("app/deskripsi_objek.json", "r", encoding="utf-8") as f:
    deskripsi_objek = json.load(f)

async def classify_image(image_bytes: bytes):
    # Proses gambar
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    image = image.resize((640, 640))  # Sesuaikan input size model
    image_array = np.array(image) / 255.0
    image_array = np.expand_dims(image_array, axis=0)

    # Prediksi
    predictions = model.predict(image_array)[0]
    predicted_class = int(np.argmax(predictions))
    confidence = float(np.max(predictions))

    # Ambil informasi dari JSON
    info = deskripsi_objek.get(str(predicted_class), {})
    nama = info.get("nama", "Tidak diketahui")
    deskripsi = info.get("deskripsi", "Deskripsi tidak tersedia.")

    return {
        "class_id": predicted_class,
        "confidence": confidence,
        "nama": nama,
        "deskripsi": deskripsi
    }
