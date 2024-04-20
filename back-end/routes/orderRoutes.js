import express from 'express';
import orderControllers from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
const router = express.Router();

router
  .route('/')
  .post(protect, orderControllers.addOrderItems)
  .get(protect, admin, orderControllers.getAllOrders);

router.route('/my-orders').get(protect, orderControllers.getMyOrders);
router.route('/:id').get(protect, admin, orderControllers.getOrderById);
router.route('/:id/pay').get(protect, orderControllers.updateOrderToPaid);
router
  .route('/:id/deliver')
  .get(protect, admin, orderControllers.updateOrderToDelivered);

export default router;
