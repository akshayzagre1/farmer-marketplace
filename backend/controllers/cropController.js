const Crop = require('../models/Crop');

// Farmers can create crop listings.
const createCrop = async (req, res) => {
  try {
    const crop = await Crop.create({ ...req.body, farmer: req.user.id });
    return res.status(201).json(crop);
  } catch (error) {
    return res.status(400).json({ message: 'Could not create crop listing', error: error.message });
  }
};

// Public crop list with simple search and location filters.
const getCrops = async (req, res) => {
  try {
    const { search = '', location = '' } = req.query;
    const filters = {
      name: { $regex: search, $options: 'i' },
      location: { $regex: location, $options: 'i' }
    };

    const crops = await Crop.find(filters).populate('farmer', 'name email').sort({ createdAt: -1 });
    return res.json(crops);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch crops', error: error.message });
  }
};

// Farmers can see only their own listings.
const getMyCrops = async (req, res) => {
  try {
    const crops = await Crop.find({ farmer: req.user.id }).sort({ createdAt: -1 });
    return res.json(crops);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch your crops', error: error.message });
  }
};

const updateMyCrop = async (req, res) => {
  try {
    const crop = await Crop.findOneAndUpdate(
      { _id: req.params.id, farmer: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!crop) {
      return res.status(404).json({ message: 'Crop not found' });
    }

    return res.json(crop);
  } catch (error) {
    return res.status(400).json({ message: 'Could not update crop', error: error.message });
  }
};

const deleteMyCrop = async (req, res) => {
  try {
    const crop = await Crop.findOneAndDelete({ _id: req.params.id, farmer: req.user.id });

    if (!crop) {
      return res.status(404).json({ message: 'Crop not found' });
    }

    return res.json({ message: 'Crop listing deleted' });
  } catch (error) {
    return res.status(500).json({ message: 'Could not delete crop', error: error.message });
  }
};

module.exports = {
  createCrop,
  getCrops,
  getMyCrops,
  updateMyCrop,
  deleteMyCrop
};
