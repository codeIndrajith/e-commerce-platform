import React from 'react';

const Product = (props) => {
  return (
    <>
      <div className="bg-white rounded-lg overflow-hidden shadow-md w-full h-full grid grid-col-2">
        <div className="w-full">
          <a href={`/product/${props.product._id}`}>
            <img
              className="w-full object-cover"
              src={props.product.image}
              alt={props.product.name}
            />
          </a>
        </div>

        <div className="p-4 flex flex-col items-center">
          <a href={`/product/${props.product._id}`}>
            <h3 className="text-lg font-semibold mb-2">
              <strong>{props.product.name}</strong>
            </h3>
          </a>

          <div>
            <h6 className="text-gray-700">${props.product.price}</h6>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
