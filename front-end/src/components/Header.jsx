import React, { useState } from 'react';
import { CiShoppingCart } from 'react-icons/ci';
import { CiUser } from 'react-icons/ci';

const Header = () => {
  return (
    <header className="bg-gray-700 p-2">
      <div className="w-full pl-10 pr-10 flex justify-between items-center">
        <div className="">
          <a className="text-white" href="/">
            IBshop
          </a>
        </div>

        <div className="flex justify-between items-center space-x-5">
          <div className="flex justify-center items-center space-x-2">
            <CiShoppingCart className="text-white" />
            <a className="text-white" href="/cart">
              Cart
            </a>
          </div>
          <div className="flex justify-center items-center space-x-2">
            <CiUser className="text-white" />
            <a className="text-white" href="/sign-in">
              Sign IN
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
