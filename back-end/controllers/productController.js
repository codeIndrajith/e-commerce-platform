import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../model/productModel.js';

const getAllProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find({});
  res.json(products);
});

const getSpecificProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    return res.json(product);
  }

  res.status(404).json({ message: 'Product is not found!' });
});

const productsControllers = { getAllProducts, getSpecificProduct };
export default productsControllers;
