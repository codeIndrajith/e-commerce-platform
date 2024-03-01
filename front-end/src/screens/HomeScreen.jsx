import React from 'react';
import Product from '../components/Product';
import { Alert } from '@material-tailwind/react';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import { DotLoader } from 'react-spinners';

const HomeScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <>
      {isLoading ? (
        <DotLoader className="fixed left-1/2" color="#36d7b7" size={100} />
      ) : error ? (
        <Alert color="blue">{error?.data?.message || error.error}</Alert>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4">Latest Products</h1>
          <div className="grid grid-cols-12 gap-4">
            {products.map((product) => (
              <div
                key={product._id}
                className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3"
              >
                <div className="bg-white p-4 rounded-lg shadow w-full h-full">
                  <Product product={product} />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default HomeScreen;
