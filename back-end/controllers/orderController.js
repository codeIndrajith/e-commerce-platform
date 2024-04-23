import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../model/orderModel.js';

// @desc      Create new order
// @route     POST/api/orders
// @access    Private
const addOrderItems = asyncHandler(async (req, res, next) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    const order = new Order({
      orderItems: orderItems.map((orderItem) => ({
        ...orderItem,
        product: orderItem._id,
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

// @desc      GET logged in user orders
// @route     GET/api/orders/myOrders
// @access    Private
const getMyOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});

// @desc      GET order by id
// @route     GET/api/orders/:id
// @access    Private
const getOrderById = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc      UPDATE order to paid
// @route     GET/api/orders/:id/pay
// @access    Private
const updateOrderToPaid = asyncHandler(async (req, res, next) => {
  res.send('update order to paid');
});

// @desc      UPDATE order to delivered
// @route     GET/api/orders/:id/deliver
// @access    Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res, next) => {
  res.send('update order to delivered');
});

// @desc      GET all orders
// @route     GET/api/orders
// @access    Private/Admin
const getAllOrders = asyncHandler(async (req, res, next) => {
  res.send('get oll orders by admin');
});

const orderControllers = {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getAllOrders,
};

export default orderControllers;
