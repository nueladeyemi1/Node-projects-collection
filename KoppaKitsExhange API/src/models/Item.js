const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
  images: [String],
  size: {
    type: String,
    enum: ['small', 'medium', 'large', 'extra-large'],
  },
  status: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  description: String,
  kit_type: String,
})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item
