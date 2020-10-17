const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Customer = mongoose.model('Customer', schema);
module.exports = Customer;
