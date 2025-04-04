// apps/web/src/services/api.js
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://34.222.46.248/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add interceptors for auth if needed
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const bookRide = (bookingData) => api.post('/bookings', bookingData)
export const getFareEstimate = (routeData) => api.post('/bookings/estimate', routeData)
export const getActiveDrivers = () => api.get('/drivers/active')