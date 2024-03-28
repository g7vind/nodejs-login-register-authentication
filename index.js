const express = require('express');
const app = express();
const mongoose = require('mongoose');
const authRouter = require('./routes/auth');
const cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

app.use(cors({ credentials: true})); // Replace with your client URL

// Connect to MongoDB
mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware to parse JSON request bodies and cookies
app.use(express.json());
// app.use(bodyParser.json());
app.use(cookieParser());

// Routes
app.use('/api', authRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});