const express = require('express');
const { createOrder, getMyBuyerOrders, getFarmerOrders } = require('../controllers/orderController');
const { auth, requireRole } = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, requireRole('buyer'), createOrder);
router.get('/buyer/my', auth, requireRole('buyer'), getMyBuyerOrders);
router.get('/farmer/my', auth, requireRole('farmer'), getFarmerOrders);

module.exports = router;
