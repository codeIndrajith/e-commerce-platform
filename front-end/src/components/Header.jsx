import React, { useState } from 'react';
import { MdMenu, MdClose } from 'react-icons/md';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="relative select-none bg-black lg:flex lg:items-stretch w-full">
      <div className="flex flex-no-shrink items-stretch h-12">
        <a
          href="/"
          className="flex-no-grow flex-no-shrink relative pl-[4.5%] leading-normal text-white no-underline flex items-center hover:bg-grey-dark"
        >
          IBshop
        </a>
        <div className="block items-center mt-3 lg:hidden cursor-pointer ml-auto relative w-12 h-12 pr-[6%]">
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
        className={`hidden lg:flex items-center pl-[78%] ${
          isMenuOpen ? 'absolute' : 'relative'
        }`}
      >
        <a
          href="/cart"
          className="py-2 px-4 leading-normal text-white no-underline flex items-center hover:bg-grey-dark"
        >
          Cart
        </a>
        <a
          href="sign-in"
          className="py-2 px-4 leading-normal text-white no-underline flex items-center hover:bg-grey-dark"
        >
          Login
        </a>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden flex flex-col items-start pl-[2.7%]">
          <a
            href="/cart"
            className="py-2 px-4 leading-normal text-white no-underline flex items-center hover:bg-grey-dark"
          >
            Cart
          </a>
          <a
            href="sign-in"
            className="py-2 px-4 leading-normal text-white no-underline flex items-center hover:bg-grey-dark"
          >
            Login
          </a>
        </div>
      )}
    </nav>
  );
};

export default Header;
