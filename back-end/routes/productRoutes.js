import express from 'express';
import productsControllers from '../controllers/productController.js';
const router = express.Router();

router.get('/', productsControllers.getAllProducts); // or we can write this code        router.route('/').get(productsControllers.getAllProducts) -> route identified in what is use request method like get,post.. using endpoint

router.get('/:id', productsControllers.getSpecificProduct);

export default router;
