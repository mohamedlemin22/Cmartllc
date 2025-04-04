const mongoose = require('mongoose');
const Booking = require('./models/Booking');

// Connection helper
const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Database connected');
  } catch (err) {
    console.error('Connection error:', err);
    process.exit(1);
  }
};

module.exports = {
  Booking,
  connectDB,
  mongoose // Export mongoose for transactions
};