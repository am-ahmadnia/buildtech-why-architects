const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Customer',
  },
  name: {
    type: String,
    required: true,
  },
});

const Customer = mongoose.model('Customer', schema);
module.exports = Customer;
