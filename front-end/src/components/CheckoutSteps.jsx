import React from 'react';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <div>
        {step1 ? (
          <a href="/sign-in" className="text-blue-700">
            Sign In
          </a>
        ) : (
          <p disables className="text-gray-400">
            Sign In
          </p>
        )}
      </div>

      <div>
        {step2 ? (
          <a href="/shipping" className="text-blue-700">
            Shipping
          </a>
        ) : (
          <p disables className="text-gray-400">
            Shipping
          </p>
        )}
      </div>

      <div>
        {step3 ? (
          <a href="/payment" className="text-blue-700">
            Payment
          </a>
        ) : (
          <p disables className="text-gray-400">
            Payment
          </p>
        )}
      </div>

      <div>
        {step4 ? (
          <a href="/place-order" className="text-blue-700">
            Place Order
          </a>
        ) : (
          <p disables className="text-gray-400">
            Place Order
          </p>
        )}
      </div>
    </div>
  );
};

export default CheckoutSteps;
