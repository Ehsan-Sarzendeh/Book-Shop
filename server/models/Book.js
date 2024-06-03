const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  price: { type: Number, required: true },
  condition: { type: String, required: true },
});

module.exports = mongoose.model('Book', BookSchema);
