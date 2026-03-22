const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema(
  {
    farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1 },
    location: { type: String, required: true, trim: true },
    image: { type: String, default: '' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Crop', cropSchema);
