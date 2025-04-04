const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  name: String,
  phone: String,
  vehicle: String,
  pickupTime: Date,
  pickupLocation: String,
  dropoffLocation: String,
  status: { type: String, default: 'pending' }
});

// Add this export
module.exports = mongoose.model('Booking', BookingSchema);