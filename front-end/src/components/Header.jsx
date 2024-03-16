import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdMenu, MdClose } from 'react-icons/md';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { CiShoppingCart } from 'react-icons/ci';
import { CiLogin } from 'react-icons/ci';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../slices/authSlice';
import { useLogoutMutation } from '../slices/usersApiSlice';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems } = useSelector((state) => state.cart); // useSelector hook use to need to something select the state, then use to this hook like this.
  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [logoutApiCall] = useLogoutMutation();

  const handleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/sign-in');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className="relative select-none bg-black lg:pl-10 lg:flex lg:items-stretch w-full">
      <div className="flex flex-no-shrink items-stretch h-12 text-xl">
        <a
          href="/"
          className="flex-no-grow flex-no-shrink relative pl-[4.5%] leading-normal text-white no-underline flex items-center hover:bg-grey-dark"
        >
          IBshop
        </a>
        <div className="block items-center mt-3 lg:hidden cursor-pointer ml-auto relative w-12 h-12 pr-[6%] text-xl">
          {!isMenuOpen && (
            <button className="text-white cursor-pointer" onClick={toggleMenu}>
              <MdMenu />
            </button>
          )}
          {isMenuOpen && (
            <button className="text-white cursor-pointer" onClick={toggleMenu}>
              <MdClose />
            </button>
          )}
        </div>
      </div>

      <div
        className={`hidden lg:flex items-center pl-[78%] text-xl ${
          isMenuOpen ? 'absolute' : 'relative'
        }`}
      >
        <a
          href="/cart"
          className="py-2 px-4 leading-normal text-white no-underline flex items-center hover:bg-grey-dark"
        >
          <CiShoppingCart />{' '}
          {cartItems.length > 0 && (
            <span className="bg-green-500 text-black font-bold rounded-full p-[2px] text-[9px] mt-2">
              {cartItems.reduce((a, c) => a + c.qty, 0)}
            </span>
          )}
        </a>
        {userInfo ? (
          <div className="relative inline-block text-white">
            <button
              className="flex justify-center items-center border border-white pl-4 pr-auto"
              onClick={handleDropdown}
            >
              {userInfo.name} <RiArrowDropDownLine />
            </button>
            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl">
                <a href="/profile" className="block px-4 py-2 text-sm">
                  Profile
                </a>
                <div
                  className="block px-4 py-2 text-sm"
                  onClick={logoutHandler}
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        ) : (
          <a
            href="sign-in"
            className="py-2 px-4 leading-normal text-white no-underline flex items-center hover:bg-grey-dark"
          >
            <CiLogin />
          </a>
        )}
      </div>

      {isMenuOpen && (
        <div className="lg:hidden flex flex-col items-start pl-[2.7%] text-xl">
          <a
            href="/cart"
            className="py-2 px-4 leading-normal text-white no-underline flex items-center hover:bg-grey-dark"
          >
            <CiShoppingCart />
            {cartItems.length > 0 && (
              <span className="bg-green-500 text-black font-bold rounded-full p-[2px] text-[9px] mt-2">
                {cartItems.reduce((a, c) => a + c.qty, 0)}
              </span>
            )}
          </a>
          {userInfo ? (
            <div className={`relative inline-block text-white left-4 mb-2`}>
              <button
                className="border border-white pl-4 pr-auto flex justify-center items-center"
                onClick={handleDropdown}
              >
                {userInfo.name} <RiArrowDropDownLine />
              </button>
              {isOpen && (
                <div className="absolute left-14 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl">
                  <a href="/profile" className="block px-4 py-2 text-sm">
                    Profile
                  </a>
                  <div
                    className="block px-4 py-2 text-sm"
                    onClick={logoutHandler}
                  >
                    Logout
                  </div>
                </div>
              )}
            </div>
          ) : (
            <a
              href="sign-in"
              className="py-2 px-4 leading-normal text-white no-underline flex items-center hover:bg-grey-dark"
            >
              <CiLogin />
            </a>
          )}
        </div>
      )}
    </nav>
  );
};

export default Header;
