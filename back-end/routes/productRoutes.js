import express from 'express';
import productsControllers from '../controllers/productController.js';
const router = express.Router();

router.get('/', productsControllers.getAllProducts);

router.get('/:id', productsControllers.getSpecificProduct);

export default router;
