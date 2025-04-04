const { Schema } = require('mongoose');

const BookingSchema = new Schema({
  customerName: { type: String, required: true },
  phone: { type: String, required: true },
  vehicleType: { 
    type: String, 
    enum: ['Chevrolet Suburban 2023', 'Kia Sedona 2020'],
    required: true 
  },
  pickupTime: { type: Date, required: true },
  pickupLocation: {
    address: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  dropoffLocation: {
    address: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  fare: { type: Number, required: true }
}, { timestamps: true });

module.exports = BookingSchema;