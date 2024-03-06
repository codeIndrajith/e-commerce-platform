import express from 'express';
import userController from '../controllers/userController.js';
const router = express.Router();

router.post('/login', userController.authUser);

// router.get('/', userController.getUser);
// router.post('/', userController.registerUser);
router.route('/').get(userController.getUser).post(userController.registerUser);

router.post('/logout', userController.logoutUser);

// router.get('/profile' , userController.getUserProfile);
// router.put('/profile' , userController.updateUserProfile);
router
  .route('/profile')
  .get(userController.getUserProfile)
  .put(userController.updateUserProfile);

// router.delete('/:id', userController.deleteUser);
// router.get('/:id', userController.getUserByID);
// router.put('/:id', userController.updateUser);
router
  .route('/:id')
  .delete(userController.deleteUser)
  .get(userController.getUserByID)
  .put(userController.updateUser);

export default router;
