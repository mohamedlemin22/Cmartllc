// packages/database/schemas/Booking.js
const mongoose = require('mongoose')

const BookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  vehicleType: { type: String, enum: ['suburban', 'sedona'], required: true },
  pickupLocation: {
    address: String,
    coordinates: { lat: Number, lng: Number }
  },
  fare: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'accepted', 'in_progress', 'completed', 'cancelled'],
    default: 'pending'
  }
}, { timestamps: true })

module.exports = mongoose.model('Booking', BookingSchema)
