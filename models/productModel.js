const mongoose = require('mongoose');

const posterSchema = new mongoose.Schema(
  {
    title: {
      type: String
    },
    subtitle: {
      type: String
    },
    voice: {
      type: String
    },
    isFavorite: false,
    categories: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Categories'
    },
    time: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

const Products = mongoose.model('Products', posterSchema);

module.exports = Products;
