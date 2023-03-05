import React, { useState, useEffect } from 'react';
import { Navbar } from './Navbar';
import { Carasouel } from './Carasouel';
import { Link } from 'react-router-dom';

export const Catalog = () => {
  const [Sdata, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const catalogItems = () => {
    fetch('http://localhost:3000/api/products')
      .then(res => res.json())
      .then(data => { setData(data); setIsLoaded(true); })
      .catch(err => { setError(err); setIsLoaded(true); });
  };
  useEffect(() => {
    catalogItems();
  }, []);
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Navbar />
      < Carasouel />
      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-3 px-4 sm:py-27 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {Sdata.slice(0, 12).map((item, index) => (
              <Link key={index} to={`/product/${item.productId}`}className="group cursor-pointer">
                <div className=''>
                  <img
                  src={item.imageUrl}
                  alt={item.imageAlt}
                    className=" w-full h-80 object-center object-cover rounded-lg "
                />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">{item.name}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">{`$${item.price}`}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
