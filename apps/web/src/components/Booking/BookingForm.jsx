// apps/web/src/components/Booking/BookingForm.jsx
import { useState } from 'react'
import { useMap } from '../services/maps'

export default function BookingForm() {
  const [pickup, setPickup] = useState('')
  const [vehicle, setVehicle] = useState('suburban')
  const { renderMap, getLocation } = useMap()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const location = await getLocation(pickup)
    // Call API to book ride
  }

  return (
    <form onSubmit={handleSubmit}>
      {renderMap()}
      <input 
        value={pickup} 
        onChange={(e) => setPickup(e.target.value)}
        placeholder="Enter pickup location"
      />
      <select value={vehicle} onChange={(e) => setVehicle(e.target.value)}>
        <option value="suburban">Chevrolet Suburban 2023</option>
        <option value="sedona">Kia Sedona 2020</option>
      </select>
      <button type="submit">Book Now</button>
    </form>
  )
}
