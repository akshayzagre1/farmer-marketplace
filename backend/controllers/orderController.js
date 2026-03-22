const Crop = require('../models/Crop');
const Order = require('../models/Order');

// Buyers can place a simple order request directly to farmers.
const createOrder = async (req, res) => {
  try {
    const { cropId, quantity, message } = req.body;

    const crop = await Crop.findById(cropId);
    if (!crop) {
      return res.status(404).json({ message: 'Crop listing not found' });
    }

    const order = await Order.create({
      crop: crop._id,
      farmer: crop.farmer,
      buyer: req.user.id,
      quantity,
      message
    });

    return res.status(201).json(order);
  } catch (error) {
    return res.status(400).json({ message: 'Could not place order', error: error.message });
  }
};

const getMyBuyerOrders = async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.user.id })
      .populate('crop', 'name price location')
      .populate('farmer', 'name email')
      .sort({ createdAt: -1 });

    return res.json(orders);
  } catch (error) {
    return res.status(500).json({ message: 'Could not fetch orders', error: error.message });
  }
};

const getFarmerOrders = async (req, res) => {
  try {
    const orders = await Order.find({ farmer: req.user.id })
      .populate('crop', 'name price quantity')
      .populate('buyer', 'name email')
      .sort({ createdAt: -1 });

    return res.json(orders);
  } catch (error) {
    return res.status(500).json({ message: 'Could not fetch incoming orders', error: error.message });
  }
};

module.exports = { createOrder, getMyBuyerOrders, getFarmerOrders };
