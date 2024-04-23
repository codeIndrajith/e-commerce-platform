import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';
import { Alert } from '@material-tailwind/react';
import { useGetProductQuery } from '../slices/productsApiSlice';
import { DotLoader } from 'react-spinners';
import { useState } from 'react';
import { addToCart } from '../slices/cartSlice';
import { useDispatch } from 'react-redux';

// useDispatch allows React components to dispatch actions to the Redux store. The useDispatch is hook in the redux library

const ProductScreen = () => {
  const { id: productId } = useParams();
  const [qty, setQty] = useState(1);
  const { data: product, isLoading, error } = useGetProductQuery(productId);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };
  return (
    <>
      <Link
        to="/"
        className="text-blue-500 mb-4 inline-block border p-2 pr-4 pl-8 bg-blue-200 rounded-full"
      >
        &larr; Go Back
      </Link>
      {isLoading ? (
        <DotLoader className="fixed left-1/2" color="#36d7b7" size={100} />
      ) : error ? (
        <Alert color="blue">{error?.data?.Alert || error.error}</Alert>
      ) : (
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Image show section */}
            <div>
              <img src={product.image} alt={product.name} className="w-full" />
            </div>
            {/* Product details section */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">{product.name}</h2>
              <hr className="my-4" />
              <div className="flex flex-col space-y-4 mb-4">
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} Reviews`}
                />
                <p className="text-justify">{product.description}</p>
              </div>
              <p className="text-black mb-4">
                Price: <strong>${product.price}</strong>
              </p>
              <div className="mb-4">
                <p className="text-gray-700">
                  Availability:{' '}
                  <strong>
                    {parseInt(product.countInStock) > 0 ? (
                      <form className="flex justify-start items-center space-x-4">
                        <label htmlFor="quantity" className="block mb-2">
                          Quantity
                        </label>
                        <select
                          name=""
                          id=""
                          value={qty}
                          onChange={(e) => setQty(Number(e.target.value))}
                          className="block w-1/2 sm:w-1/2 md:w-1/2 lg:w-1/4 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-400 focus:ring focus:ring-blue-200"
                        >
                          {[
                            ...Array(parseInt(product.countInStock)).keys(),
                          ].map((index) => (
                            <option key={index + 1} value={index + 1}>
                              {index + 1}
                            </option>
                          ))}
                        </select>
                      </form>
                    ) : (
                      'Out of Stock'
                    )}
                  </strong>
                </p>
              </div>
              <button
                type="button"
                disabled={parseInt(product.countInStock) === 0}
                onClick={addToCartHandler}
                className={`bg-blue-500 text-white px-4 py-2 rounded ${
                  parseInt(product.countInStock) === 0 &&
                  'opacity-50 cursor-not-allowed'
                }`}
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductScreen;
