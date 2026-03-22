const express = require('express');
const {
  createCrop,
  getCrops,
  getMyCrops,
  updateMyCrop,
  deleteMyCrop
} = require('../controllers/cropController');
const { auth, requireRole } = require('../middleware/auth');

const router = express.Router();

router.get('/', getCrops);
router.get('/farmer/my', auth, requireRole('farmer'), getMyCrops);
router.post('/', auth, requireRole('farmer'), createCrop);
router.put('/:id', auth, requireRole('farmer'), updateMyCrop);
router.delete('/:id', auth, requireRole('farmer'), deleteMyCrop);

module.exports = router;
