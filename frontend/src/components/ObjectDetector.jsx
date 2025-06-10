import React, { useRef, useState, useEffect } from 'react';

const ObjectDetector = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [streaming, setStreaming] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setStreaming(true);

      const id = setInterval(captureAndDetect, 1000); // tiap 1 detik kirim frame
      setIntervalId(id);
    } catch (err) {
      console.error('Gagal mengakses kamera:', err);
    }
  };

  const stopCamera = () => {
    const stream = videoRef.current.srcObject;
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    clearInterval(intervalId);
    setStreaming(false);
  };

  const captureAndDetect = async () => {
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(async (blob) => {
      const formData = new FormData();
      formData.append('file', blob, 'frame.jpg');

      try {
        const res = await fetch('http://localhost:8000/detect', {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();
        drawDetections(data.detections);
      } catch (err) {
        console.error('Gagal mendeteksi objek:', err);
      }
    }, 'image/jpeg');
  };

  const drawDetections = (detections) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 2;
    ctx.font = '16px Arial';

    detections.forEach(det => {
      const { x, y, width, height, label, confidence } = det;
      ctx.strokeStyle = 'red';
      ctx.strokeRect(x, y, width, height);
      ctx.fillStyle = 'red';
      ctx.fillText(`${label} (${(confidence * 100).toFixed(1)}%)`, x, y - 5);
    });
  };

  return (
    <div className="my-10">
      <h2 className="text-xl font-semibold mb-4">Object Detection Kamera Live</h2>

      <div className="relative w-full max-w-xl mx-auto">
        <video ref={videoRef} autoPlay muted className="rounded-lg w-full" />
        <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full pointer-events-none" />
      </div>

      <div className="flex justify-center mt-4 space-x-4">
        {!streaming ? (
          <button onClick={startCamera} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
            Hidupkan Kamera
          </button>
        ) : (
          <button onClick={stopCamera} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
            Matikan Kamera
          </button>
        )}
      </div>
    </div>
  );
};

export default ObjectDetector;
