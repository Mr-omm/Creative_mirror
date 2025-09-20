// src/lib/api.ts
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Attach token automatically
api.interceptors.request.use(cfg => {
  try {
    const raw = localStorage.getItem('cm_token');
    if (raw) cfg.headers = { ...cfg.headers, Authorization: `Bearer ${raw}` };
  } catch (e) {}
  return cfg;
});

export default api;