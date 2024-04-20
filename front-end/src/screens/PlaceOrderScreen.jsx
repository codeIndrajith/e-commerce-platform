import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping');
    } else if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);
  return (
    <div className="mx-auto max-w-lg p-6">
      <CheckoutSteps step1 step2 step3 step4 />
      <div>
        <div>Column</div>
        <div>Column</div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
