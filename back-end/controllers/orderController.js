import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../model/orderModel.js';

// @desc      Create new order
// @route     POST/api/orders
// @access    Private
const addOrderItems = asyncHandler(async (req, res, next) => {
  res.send('add order items');
});

// @desc      GET logged in user orders
// @route     GET/api/orders/myOrders
// @access    Private
const getMyOrders = asyncHandler(async (req, res, next) => {
  res.send('get my orders');
});

// @desc      GET order by id
// @route     GET/api/orders/:id
// @access    Private
const getOrderById = asyncHandler(async (req, res, next) => {
  res.send('get my order by id');
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
