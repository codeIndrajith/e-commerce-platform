import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <div className="flex flex-col justify-center items-center">
        <p className="text-md text-gray-600">IBshop &copy; {currentYear} </p>
        <p className="text-sm text-gray-500">
          Developed By Indrajith Bodhinayaka{' '}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
