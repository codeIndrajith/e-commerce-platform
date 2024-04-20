import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../slices/cartSlice';
import CheckoutSteps from '../components/CheckoutSteps';
import paypalIcon from '../images/paypal.png';
import creditCardIcon from '../images/atm-card.png';

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress) {
      navigate('/sign-in');
    }
  }, [shippingAddress, navigate]);

  const handlePaymentMethod = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/place-order');
  };
  return (
    <div className="mx-auto max-w-lg p-6">
      <div className="">
        <div>
          <CheckoutSteps step1 step2 step3 />
          <h1 className="p-3 text-3xl font-bold text-center">Payment</h1>
        </div>

        <form onSubmit={handlePaymentMethod} className="mt-4">
          <p className="text-gray-500 text-[20px]">
            How would you like to pay ?
          </p>
          <div className="flex flex-col gap-3 mt-8">
            <div className="flex items-center gap-10 justify-between">
              <div className="flex items-center gap-10">
                <input
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  type="radio"
                  name="paymentMethod"
                  id="PayPal"
                  value="PayPal"
                />
                <label className="text-xl font-serif" htmlFor="">
                  PayPal
                </label>
              </div>
              <img src={paypalIcon} className="w-[13%]" alt="paypal icone" />
            </div>

            <div className="flex items-center justify-between gap-10">
              <div className="flex items-center gap-10">
                <input
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  type="radio"
                  name="paymentMethod"
                  id="Credit-Card"
                  value="Credit-Card"
                />
                <label className="text-xl font-serif" htmlFor="">
                  Credit Card
                </label>
              </div>
              <img
                src={creditCardIcon}
                alt="credit card icon"
                className="w-[11%]"
              />
            </div>
          </div>

          <button
            className="bg-blue-500 mt-4 text-white rounded-lg p-3 w-full cursor-pointer font-bold uppercase"
            type="submit"
            variant="primary"
          >
            Continue to Contact
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentScreen;
