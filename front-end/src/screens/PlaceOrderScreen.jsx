import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import { DotLoader } from 'react-spinners';
import { Alert } from '@material-tailwind/react';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import { clearCartItems } from '../slices/cartSlice';
import paypalIcon from '../images/paypal.png';
import cardIcon from '../images/atm-card.png';
import placeOrderIcon from '../images/placeOrder.png';

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping');
    } else if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <div>
      <div className="mx-auto max-w-lg p-6">
        <CheckoutSteps step1 step2 step3 step4 />
      </div>

      <hr className="w-full" />

      <div className="max-w-full flex items-center flex-col md:flex-row gap-3 p-3 justify-between">
        {/* Column one */}
        <div className="w-3/4 h-screen">
          <div class="w-full flex flex-col md:flex-row justify-between items-center">
            <div class="flex flex-col gap-3">
              <div>
                <h2 class="text-3xl uppercase font-bold bg-gradient-to-r from-blue-600 via-orange-500 to-indigo-600 inline-block text-transparent bg-clip-text">
                  Shipping Details
                </h2>
                <p class="mt-6">
                  <strong class="text-xl">Address</strong>
                  <span class="text-gray-600 block">
                    {cart.shippingAddress.address}, {cart.shippingAddress.city},{' '}
                    {cart.shippingAddress.postalCode},{' '}
                    {cart.shippingAddress.country}
                  </span>
                </p>
              </div>

              <div class="relative">
                <strong class="text-xl">Payment Method</strong>
                {cart.paymentMethod === 'PayPal' ? (
                  <img
                    class="w-24 mt-3"
                    src={paypalIcon}
                    alt={cart.paymentMethod}
                  />
                ) : (
                  <img
                    class="w-20 mt-3"
                    src={cardIcon}
                    alt={cart.paymentMethod}
                  />
                )}
              </div>
            </div>

            <div class="w-56">
              <img src={placeOrderIcon} alt="place order icon" />
            </div>
          </div>

          <div className="w-full">
            <h2 class="bg-blue-600 text-white text-center font-semibold py-3 mb-2">
              Order Items
            </h2>
            {cart.cartItems.length === 0 ? (
              <div class="w-full bg-blue-200 text-blue-800 p-4 rounded-lg">
                <span class="font-semibold">Your cart is Empty</span>{' '}
                <Link to="/" class="text-blue-500">
                  Go Back
                </Link>
              </div>
            ) : (
              <div>
                {cart.cartItems.map((item) => (
                  <div
                    key={item._id}
                    class="flex justify-around items-center border-b border-gray-300 py-2"
                  >
                    <div class="">
                      <img
                        class="w-20 h-20 object-cover"
                        src={item.image}
                        alt={item.name}
                      />
                    </div>
                    <div class="w-1/3 font-semibold">
                      <Link
                        to={`/product/${item._id}`}
                        class="text-blue-600 hover:underline"
                      >
                        {item.name} ({item.qty})
                      </Link>
                    </div>
                    <div class="w-1/3 font-mono text-xl">
                      ${item.qty * item.price}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* Column two */}
        <div className=" w-full md:w-1/4 h-screen">
          <div>
            <div class="bg-gray-900 text-white p-4 rounded-lg shadow-lg">
              <h2 class="text-2xl font-bold text-center mb-4">Order Summary</h2>
              <div class="flex flex-col gap-2">
                <div class="flex justify-between ">
                  <h5>Items</h5>
                  <div>${cart.itemsPrice}</div>
                </div>

                <div class="flex justify-between">
                  <h5>Shipping</h5>
                  <div>${cart.shippingPrice}</div>
                </div>

                <div class="flex justify-between">
                  <h5>Tax</h5>
                  <div>${cart.taxPrice}</div>
                </div>

                <div class="flex justify-between">
                  <h5>Total</h5>
                  <div>${cart.totalPrice}</div>
                </div>

                <div class="text-red-500">{error && <p>{error}</p>}</div>

                <div class="mt-4">
                  <button
                    class="w-full py-2 px-4 bg-blue-700 text-white font-bold rounded-lg uppercase hover:bg-blue-800 disabled:opacity-50"
                    type="button"
                    disabled={cart.cartItems.length === 0}
                    onClick={placeOrderHandler}
                  >
                    Place Order
                  </button>
                  {isLoading && <DotLoader />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
