import express from 'express';
import userController from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/login', userController.authUser);

// router.get('/', userController.getUser);
// router.post('/', userController.registerUser);
router
  .route('/')
  .get(protect, admin, userController.getUser)
  .post(userController.registerUser);

router.post('/logout', userController.logoutUser);

// router.get('/profile' , userController.getUserProfile);
// router.put('/profile' , userController.updateUserProfile);
router
  .route('/profile')
  .get(protect, userController.getUserProfile)
  .put(protect, userController.updateUserProfile);

// router.delete('/:id', userController.deleteUser);
// router.get('/:id', userController.getUserByID);
// router.put('/:id', userController.updateUser);
router
  .route('/:id')
  .delete(protect, admin, userController.deleteUser)
  .get(protect, admin, userController.getUserByID)
  .put(protect, admin, userController.updateUser);

export default router;
