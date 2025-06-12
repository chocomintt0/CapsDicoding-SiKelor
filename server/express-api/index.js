const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// URL FastAPI backend
const FASTAPI_BASE = 'http://127.0.0.1:8000';

// Proxy endpoint untuk klasifikasi
app.post('/api/classify', async (req, res) => {
  try {
    const response = await axios.post(`${FASTAPI_BASE}/classify`, req.body);
    res.json(response.data);
  } catch (err) {
    console.error('Error di /api/classify:', err.message);
    res.status(500).json({ error: 'Gagal memproses klasifikasi' });
  }
});

// Proxy endpoint untuk deteksi objek
app.post('/api/detect', async (req, res) => {
  try {
    const response = await axios.post(`${FASTAPI_BASE}/detect`, req.body);
    res.json(response.data);
  } catch (err) {
    console.error('Error di /api/detect:', err.message);
    res.status(500).json({ error: 'Gagal memproses deteksi objek' });
  }
});

// Jalankan server proxy di port 3001
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Express proxy server aktif di http://localhost:${PORT}`);
});
