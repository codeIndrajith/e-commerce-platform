import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { Alert } from '@material-tailwind/react';
import { addToCart } from '../slices/cartSlice';

const CartScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };
  return (
    <div>
      <div>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Alert color="blue">
            <span>Your cart is Empty</span> <Link to="/">Go Back</Link>
          </Alert>
        ) : (
          <div>
            {cartItems.map((item) => (
              <div>
                <div key={item._id}>
                  <div>
                    <img src={item.image} alt={item.name} />
                  </div>
                </div>
                <div>
                  <Link to={`/product/${item._id}`}>{item.name}</Link>
                </div>
                <div>
                  <span>{item.price}</span>
                </div>
                <div>
                  <form className="flex justify-start items-center space-x-4">
                    <label htmlFor="quantity" className="block mb-2">
                      Quantity
                    </label>
                    <select
                      name=""
                      id=""
                      value={item.qty}
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                      className="block w-1/2 sm:w-1/2 md:w-1/2 lg:w-1/4 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-400 focus:ring focus:ring-blue-200"
                    >
                      {[...Array(parseInt(item.countInStock)).keys()].map(
                        (index) => (
                          <option key={index + 1} value={index + 1}>
                            {index + 1}
                          </option>
                        )
                      )}
                    </select>
                  </form>
                </div>
                <div>
                  <button type="button">
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <h2>
          Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
        </h2>
        <p>
          $
          {cartItems
            .reduce((acc, item) => acc + item.qty * item.price, 0)
            .toFixed(2)}
        </p>
        <div>
          <button type="button" disabled={cartItems.length === 0}>
            Proceed To Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
