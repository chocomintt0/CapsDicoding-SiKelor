// server.js

import express from 'express';
import cors from 'cors';
import fs from 'fs/promises'; // Menggunakan fs/promises untuk async/await
import path from 'path';

// Inisialisasi aplikasi Express
const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Mengizinkan request dari domain lain (frontend Anda)
app.use(express.json()); // Mem-parse body request JSON

// Helper function untuk membaca file JSON
const readJsonFile = async (fileName) => {
  const filePath = path.join(process.cwd(), 'data', fileName);
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
};

// --- API Endpoints untuk Data Statis ---

// Endpoint untuk mendapatkan semua event
app.get('/api/events', async (req, res) => {
  try {
    const events = await readJsonFile('events.json');
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Gagal memuat data event' });
  }
});

// Endpoint untuk mendapatkan semua collection
app.get('/api/collections', async (req, res) => {
  try {
    const collections = await readJsonFile('collections.json');
    res.json(collections);
  } catch (error) {
    res.status(500).json({ message: 'Gagal memuat data collection' });
  }
});

// Endpoint untuk mendapatkan semua artikel
app.get('/api/articles', async (req, res) => {
  try {
    const articles = await readJsonFile('articles.json');
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Gagal memuat data artikel' });
  }
});

// Endpoint dasar untuk testing
app.get('/', (req, res) => {
  res.send('Backend Server Berjalan!');
});

// Menjalankan server
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});