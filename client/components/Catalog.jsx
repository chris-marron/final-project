import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navbar } from './Navbar';
import { Carasouel } from './Carasouel';

export const Catalog = () => {
  const [Sdata, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const catalogItems = () => {
    const options = {
      method: 'GET',
      url: 'http://localhost:3000/catalog'
    };
    axios.request(options).then(response => {
      setData(response.data.products);
      setIsLoaded(true);
    }).catch(error => {
      console.error(error);
      setError(error);
      setIsLoaded(true);
    });
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
      < Navbar data={Sdata}/>
      < Carasouel />
      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {Sdata.slice(0, 12).map((item, index) => (
              <a key={index} href={item.href} className="group ">
                <div className='cursor-pointer'>
                  <img
                  src={item.images[0]}
                  alt={item.imageAlt}
                    className=" w-full h-80 object-center object-cover rounded-lg "
                />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">{item.title}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">{`$${item.price}`}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
