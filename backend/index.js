// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from a .env file

// Create an instance of the Express application
const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON request bodies

// Define a test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is up and running!' });
});

// Define a route for handling errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// // Connect to the MongoDB database
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to the MongoDB database.');
});

// Start the Express server
const port = process.env.PORT || 3003;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
