import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';
import { useGetProductQuery } from '../slices/productsApiSlice';

const ProductScreen = () => {
  const { id: productId } = useParams();
  const { data: product, isLoading, error } = useGetProductQuery(productId);
  return (
    <>
      <Link
        to="/"
        className="text-blue-500 mb-4 inline-block border p-2 pr-4 pl-8 bg-blue-200 rounded-full"
      >
        &larr; Go Back
      </Link>
      {isLoading ? (
        <h1>isLoading......</h1>
      ) : error ? (
        <div>{error?.data?.message || error.error}</div>
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
                    {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                  </strong>
                </p>
              </div>
              <button
                type="button"
                disabled={product.countInStock === 0}
                className={`bg-blue-500 text-white px-4 py-2 rounded ${
                  product.countInStock === 0 && 'opacity-50 cursor-not-allowed'
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
