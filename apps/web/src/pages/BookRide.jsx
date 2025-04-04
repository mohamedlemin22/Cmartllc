// apps/web/src/pages/BookRide.jsx
import { useState } from 'react'
import BookingForm from '../components/Booking/BookingForm'
import VehicleCards from '../components/Booking/VehicleCards'
import { bookRide, getFareEstimate } from '../services/api'

export default function BookRide() {
  const [fare, setFare] = useState(null)
  const [selectedVehicle, setSelectedVehicle] = useState(null)

  const handleSubmit = async (formData) => {
    try {
      const response = await bookRide({
        ...formData,
        vehicleType: selectedVehicle
      })
      alert(`Booking confirmed! ID: ${response.data.id}`)
    } catch (error) {
      alert('Booking failed: ' + error.message)
    }
  }

  return (
    <div className="booking-container">
      <h1>Book Your CMART Ride</h1>
      <VehicleCards 
        selected={selectedVehicle}
        onSelect={setSelectedVehicle}
      />
      <BookingForm 
        onSubmit={handleSubmit}
        onRouteChange={async (route) => {
          if (selectedVehicle) {
            const estimate = await getFareEstimate({
              ...route,
              vehicleType: selectedVehicle
            })
            setFare(estimate.data)
          }
        }}
      />
      {fare && (
        <div className="fare-display">
          Estimated Fare: ${fare.toFixed(2)}
        </div>
      )}
    </div>
  )
}