require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./utils/DB');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/authRoutes');

const app = express();

const port = process.env.PORT || 5000;

//!middilewares
app.use(
  cors({
    origin: process.env.CLIENT_BASE_URL || 5000,
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Cache-Control',
      'Expires',
      'Pragma',
    ],
    credentials: true,
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


//!Routes

// auth routes
app.use('/auth' , authRouter);




//! DB Connection
connectDB();

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
