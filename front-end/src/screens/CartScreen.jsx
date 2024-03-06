import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { Alert } from '@material-tailwind/react';
import { addToCart, removeCart } from '../slices/cartSlice';

const CartScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const deleteCartHandler = async (id) => {
    dispatch(removeCart(id));
  };

  const checkOutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  return (
    <div className="container mx-auto px-4">
      <div className="mt-10">
        <h1 className="text-2xl font-bold mb-5">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Alert color="blue" className="w-full">
            <span>Your cart is Empty</span>{' '}
            <Link to="/" className="text-blue-500">
              Go Back
            </Link>
          </Alert>
        ) : (
          <div>
            {cartItems.map((item) => (
              <div
                className="flex flex-col md:flex-row sm:w-full items-center justify-between border-b border-gray-200 py-4"
                key={item._id}
              >
                <div className="w-full md:w-1/2 lg:w-1/5 flex flex-row items-center justify-between md:justify-start space-x-4 mb-4 md:mb-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover"
                  />
                  <div className="flex flex-row md:flex-col space-x-3">
                    <Link to={`/product/${item._id}`} className="text-blue-500">
                      {item.name}
                    </Link>
                    <span className="block text-gray-700">${item.price}</span>
                  </div>
                </div>
                <div className="w-full md:w-1/2 flex items-center justify-end space-x-4 mb-4 md:mb-0">
                  <label htmlFor="quantity" className="block mb-2 mr-2">
                    Quantity:
                  </label>
                  <select
                    name=""
                    id=""
                    value={item.qty}
                    onChange={(e) =>
                      addToCartHandler(item, Number(e.target.value))
                    }
                    className="block w-20 px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-400 focus:ring focus:ring-blue-200"
                  >
                    {[...Array(parseInt(item.countInStock)).keys()].map(
                      (index) => (
                        <option key={index + 1} value={index + 1}>
                          {index + 1}
                        </option>
                      )
                    )}
                  </select>
                  <div>
                    <button
                      type="button"
                      onClick={() => deleteCartHandler(item._id)}
                    >
                      <FaTrash className="text-red-500" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-bold mb-3">
          Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
        </h2>
        <p className="text-gray-700">
          $
          {cartItems
            .reduce((acc, item) => acc + item.qty * item.price, 0)
            .toFixed(2)}
        </p>
        <div className="mt-5">
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:opacity-50"
            disabled={cartItems.length === 0}
            onClick={checkOutHandler}
          >
            Proceed To Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
