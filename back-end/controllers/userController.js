import asyncHandler from '../middleware/asyncHandler.js';
import User from '../model/userModel.js';
import jwt from 'jsonwebtoken';

// @desc      Auth user & get token
// @route     POST/api/users/login
// @access    Public
const authUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    //  sat JWT as HTTP only cookie
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 Days to ms
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
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
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: 'Logged out successfully' });
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
// @access    Private/Admin
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
