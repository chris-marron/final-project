import React, { useState, useEffect } from 'react';
import { Navbar } from './Navbar';
import { Link, useParams } from 'react-router-dom';

export const Category = () => {
  const [Sdata, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { id } = useParams();

  useEffect(() => {

    fetch(`http://localhost:3000/api/categories/${id}`)
      .then(res => res.json())
      .then(data => { setData(data); setIsLoaded(true); })
      .catch(err => { setError(err); setIsLoaded(true); });
  }, [id]);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Navbar />
      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-20 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {Sdata.map((item, index) => (
              <Link key={index} to={`/product/${item.productId}`} className="group cursor-pointer" >
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
