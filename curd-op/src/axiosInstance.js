// src/axiosInstance.js
import axios from 'axios';

export const bookbaseurl = axios.create({
  baseURL: "http://localhost:8000/book"
});