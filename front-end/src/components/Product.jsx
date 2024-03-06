import React from 'react';
import Rating from './Rating';

const Product = (props) => {
  return (
    <div className="">
      <div className="bg-white rounded-lg p-2 overflow-hidden shadow-md w-[90%] h-full grid grid-col-2">
        <div className="flex flex-col justify-center items-center w-full">
          <div className="w-[70%] sm:w-[80%]">
            <a href={`/product/${props.product._id}`}>
              <img src={props.product.image} alt={props.product.name} />
            </a>
          </div>

          <div className="w-full mt-4">
            <div className="p-4 flex flex-col items-center">
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
        </div>
      </div>
    </div>
  );
};

export default Product;
