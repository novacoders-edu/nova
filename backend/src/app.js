const express = require("express");
const cookieParser = require("cookie-parser");
const authRouter = require('./routes/auth.route');
const memberRouter = require('./routes/member.route');
const contactRouter = require('./routes/contact.route');
const app = express();

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(express.json());
app.use(cookieParser());

// routes


app.use('/api/auth', authRouter);
app.use('/api/member', memberRouter);
app.use('/api/contact', contactRouter);

module.exports = app;
