const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      ssl: true,
      sslValidate: true,
      sslCA: fs.readFileSync('/etc/ssl/certs/global-bundle.pem'),
      retryWrites: false
    });
    console.log('DocumentDB connected');
  } catch (err) {
    console.error('Connection error:', err);
    process.exit(1);
  }
};

module.exports = connectDB;