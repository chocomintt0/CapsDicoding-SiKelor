from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from app.services.classify import classify_image  # fungsi yang menerima image_bytes
from app.services.detect import detect_objects  # YOLO function
from pydantic import BaseModel

app = FastAPI()

# ✅ CORS untuk akses dari frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ganti sesuai origin frontend kamu
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "SIKELOR ML API is running"}

# ✅ Endpoint klasifikasi gambar
@app.post("/classify")
async def classify(file: UploadFile = File(...)):
    image_bytes = await file.read()
    result = await classify_image(image_bytes)  # pastikan classify_image adalah async
    return result

# ✅ Endpoint deteksi objek YOLO
@app.post("/detect")
async def detect(file: UploadFile = File(...)):
    image_bytes = await file.read()
    result = await detect_objects(image_bytes)  # pastikan detect_objects adalah async
    return result
