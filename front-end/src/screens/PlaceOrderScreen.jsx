import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import { DotLoader } from 'react-spinners';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import { clearCartItems } from '../slices/cartSlice';

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

      <div className="max-w-full flex items-center flex-col md:flex-row gap-3 p-3 justify-between">
        {/* Column one */}
        <div className="w-1/2 h-screen">
          <div>
            <h2>Shipping</h2>
            <p>
              <strong>Address</strong>
              {cart.shippingAddress.address}, {cart.shippingAddress.city},{' '}
              {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
            </p>
          </div>

          <div>
            <h2>Payment</h2>
            <strong>Method: </strong>
            {cart.paymentMethod}
          </div>

          <div>
            <h2>Order Items</h2>
            {cart.cartItems.length === 0 ? (
              <h5>Your cart is empty</h5>
            ) : (
              <div>
                {cart.cartItems.map((item) => (
                  <div key={item._id}>
                    <div>
                      <div>
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div>
                        <Link to={`/product/${item._id}`}>{item.name}</Link>
                      </div>
                      <div>
                        {item.qty} x ${item.price} = ${item.qty * item.price}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* Column two */}
        <div className=" w-1/2 h-screen">
          <div>
            <div>
              <div>
                <h2>Order Summary</h2>
              </div>
              <div>
                <div>
                  <h5>Items : </h5>
                  <div>${cart.itemsPrice}</div>
                </div>

                <div>
                  <h5>Shipping : </h5>
                  <div>${cart.shippingPrice}</div>
                </div>

                <div>
                  <h5>Tax : </h5>
                  <div>${cart.taxPrice}</div>
                </div>

                <div>
                  <h5>Total : </h5>
                  <div>${cart.totalPrice}</div>
                </div>

                <div>{error && <p>{error}</p>}</div>

                <div>
                  <button
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
