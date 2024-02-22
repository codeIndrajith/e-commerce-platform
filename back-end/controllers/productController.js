import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../model/productModel.js';

const getAllProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find({});
  throw new Error('Some Error');
  res.json(products);
});

const getSpecificProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    return res.json(product);
  } else {
    res.status(404);
    throw new Error('Resource not found!');
  }
});

const productsControllers = { getAllProducts, getSpecificProduct };
export default productsControllers;
