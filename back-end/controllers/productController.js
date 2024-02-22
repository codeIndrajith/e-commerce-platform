import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../model/productModel.js';

// @desc      Fetch all products
// @route     GET/api/products
// @access    Public
const getAllProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find({});
  res.json(products);
});

//  @desc     Fetch the specific product (using id)
// @route     GET/api/products/:id
// @access    Public
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
