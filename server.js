require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const upload = require('express-fileupload');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const passport = require('passport');
const main = require('./routes/main');
const admin = require('./routes/admin');
const users = require('./routes/users');
const verifyToken = require('./validation/verifyToken');

app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
// Data Sanitization against NoSQL Injection Attacks
app.use(mongoSanitize());
// XSS
app.use(xss());

app.use(passport.initialize());
require('./config/passport')(passport);
app.use(upload());

app.use('/api/', main);
app.use('/api/admin', admin);
app.use('/api/users', users);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
const port = process.env.PORT || 3000;
connection.once('open', () => {
  app.listen(port, () => console.log(`App running on port ${port}`));
});
