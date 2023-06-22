const mongoose = require('mongoose');

// Connection URL for MongoDB
const mongoURI = 'mongodb://127.0.0.1:27017/mydatabase';

// Establishing the database connection
async function connectToDatabase() {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB database');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}

// Call the connectToDatabase function to initiate the connection
connectToDatabase();

// Export the Mongoose connection for external use
module.exports = mongoose;
