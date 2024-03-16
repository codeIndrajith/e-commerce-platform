import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../slices/cartSlice';

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress?.address || '');
  const [city, setCity] = useState(shippingAddress?.city || '');
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ''
  );
  const [country, setCountry] = useState(shippingAddress?.country || '');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate('/payment');
  };

  return (
    <div className="mx-auto max-w-lg p-6">
      <h1 className="text-3xl font-semibold mb-6">Shipping</h1>
      <form onSubmit={submitHandler}>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Address</label>
          <input
            type="text"
            name="address"
            value={address}
            placeholder="Enter Address"
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 text-gray-600 border-gray-400"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">City</label>
          <input
            type="text"
            name="city"
            value={city}
            placeholder="Enter City"
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 text-gray-600 border-gray-400"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Postal Code</label>
          <input
            type="text"
            name="postalCode"
            value={postalCode}
            placeholder="Enter Postal Code"
            onChange={(e) => setPostalCode(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 text-gray-600 border-gray-400"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Country</label>
          <input
            type="text"
            name="country"
            value={country}
            placeholder="Enter Country"
            onChange={(e) => setCountry(e.target.value)}
            className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500 text-gray-600"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default ShippingScreen;
