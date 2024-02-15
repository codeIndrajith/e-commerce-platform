import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const Rating = ({ value, text }) => {
  return (
    <div className="flex flex-col justify-center items-center space-x-2">
      <div className="flex">
        <span>
          {value >= 1 ? (
            <FaStar className="text-yellow-600" />
          ) : value >= 0.5 ? (
            <FaStarHalfAlt className="text-yellow-600" />
          ) : (
            <FaRegStar className="text-yellow-600" />
          )}
        </span>
        <span>
          {value >= 2 ? (
            <FaStar className="text-yellow-600" />
          ) : value >= 1.5 ? (
            <FaStarHalfAlt className="text-yellow-600" />
          ) : (
            <FaRegStar className="text-yellow-600" />
          )}
        </span>
        <span>
          {value >= 3 ? (
            <FaStar className="text-yellow-600" />
          ) : value >= 2.5 ? (
            <FaStarHalfAlt className="text-yellow-600" />
          ) : (
            <FaRegStar className="text-yellow-600" />
          )}
        </span>
        <span>
          {value >= 4 ? (
            <FaStar className="text-yellow-600" />
          ) : value >= 3.5 ? (
            <FaStarHalfAlt className="text-yellow-600" />
          ) : (
            <FaRegStar className="text-yellow-600" />
          )}
        </span>
        <span>
          {value >= 5 ? (
            <FaStar className="text-yellow-600" />
          ) : value >= 4.5 ? (
            <FaStarHalfAlt className="text-yellow-600" />
          ) : (
            <FaRegStar className="text-yellow-600" />
          )}
        </span>
      </div>
      <span>{text && text}</span>
    </div>
  );
};

export default Rating;
