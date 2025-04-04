const mongoose = require('mongoose');
const BookingSchema = require('../schemas/BookingSchema');

// Add indexes for frequently queried fields
BookingSchema.index({ pickupTime: 1 });
BookingSchema.index({ status: 1 });

// Add instance methods
BookingSchema.methods.confirm = function() {
  this.status = 'confirmed';
  return this.save();
};

const Booking = mongoose.model('Booking', BookingSchema);
module.exports = Booking;