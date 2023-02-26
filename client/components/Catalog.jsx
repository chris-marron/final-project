import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Catalog = () => {
  const [Sdata, setData] = useState([]);
  // const [error, setError] = useState(null);
  // const [isLoaded, setIsLoaded] = useState(false);
  // const [choosenItem, setChoosenItem] = useState(null);
  const catalogItems = () => {
    const options = {
      method: 'GET',
      url: 'http://localhost:3000/products'
    };
    axios.request(options).then(response => {
      setData(response.data.products);

    }).catch(error => {
      console.error(error);
    });
  };
  useEffect(() => {
    catalogItems();
  }, []);
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {Sdata.slice(0, 12).map((item, index) => (
            <a key={index} href={item.href} className="group">
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                <img
                  src={item.images[0]}
                  alt={item.imageAlt}
                  className="h-full w-10 object-cover object-center group-hover:opacity-75 hover:cusor-pointer"
                  onClick={e => {
                    // console.log(e.target);
                  }}
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{item.title}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">{`$${item.price}`}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
