import asyncHandler from '../middleware/asyncHandler.js';
import User from '../model/userModel.js';

// @desc      Auth user & get token
// @route     POST/api/users/login
// @access    Public
const authUser = asyncHandler(async (req, res, next) => {
  res.send('Auth user');
});

// @desc      Register user
// @route     POST/api/users
// @access    Public
const registerUser = asyncHandler(async (req, res, next) => {
  res.send('Register user');
});

// @desc      Logout user / clear cookie or destroy cookie
// @route     POST/api/users/logout
// @access    Private
const logoutUser = asyncHandler(async (req, res, next) => {
  res.send('Logout user');
});

// @desc      Get User profile
// @route     GET/api/users/profile
// @access    Public
const getUserProfile = asyncHandler(async (req, res, next) => {
  res.send('Get user profile');
});

// @desc      Update user profile
// @route     PUT /api/users/profile
// @access    Private
const updateUserProfile = asyncHandler(async (req, res, next) => {
  res.send('Update user profile');
});

// @desc      Get all user
// @route     GET/api/users
// @access    Private/Admin
const getUser = asyncHandler(async (req, res, next) => {
  res.send('Get users');
});

// @desc      Delete user
// @route     DELETE /api/users/:id
// @access    Private
const deleteUser = asyncHandler(async (req, res, next) => {
  res.send('Delete user');
});

// @desc      get user
// @route     GET /api/users/:id
// @access    Private/Admin
const getUserByID = asyncHandler(async (req, res, next) => {
  res.send('Get user by id');
});

// @desc      Update User
// @route     PUT /api/users/:id
// @access    Private/Admin
const updateUser = asyncHandler(async (req, res, next) => {
  res.send('Update user');
});

const userController = {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUser,
  deleteUser,
  getUserByID,
  updateUser,
};

export default userController;