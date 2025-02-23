const express = require('express');
const app = express();
const authRouter = require('./routes/auth.route');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
require('dotenv').config();

connectDB();
app.use(cors({ credentials: true})); // Replace with your client URL
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));



app.use('/v1/api', authRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});