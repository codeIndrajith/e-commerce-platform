import React from 'react';
import Rating from './Rating';

const Product = (props) => {
  return (
    <div className="rounded-lg p-2 overflow-hidden shadow-md w-full h-full relative">
      <a href={`/product/${props.product._id}`}>
        <img
          className="w-full h-[50%] object-cover"
          src={props.product.image}
          alt={props.product.name}
        />
      </a>

      {/* Details section */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-yellow-500 rounded-ss-[50%] rounded-se-[50%]">
        <a href={`/product/${props.product._id}`}>
          <h6 className="text-md font-semibold mb-2 underline">
            <span className="text-ellipsis overflow-hidden">
              {props.product.name}
            </span>
          </h6>
        </a>

        <div className="flex flex-col justify-center items-center">
          <Rating
            value={props.product.rating}
            text={`${props.product.numReviews} Reviews`}
          />
          <h6 className="text-gray-400 mt-2 text-2xl font-bold">
            ${props.product.price}
          </h6>
        </div>
      </div>
    </div>
  );
};

export default Product;
