import React, { useState, useEffect } from 'react';

export const Catalog = () => {
  // const [isLoading, SetIsLoading] = useState(true);
  const [Sdata, setData] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => setData(data.products))
      .catch(err => {
        console.error(err);
      });
  }, []);
  return (
    <div>
      <ul className='flex'>
        {Sdata.map((item, index) =>
          <li key={index}>
            <img src={item.images[0]} alt={item.name} />
          </li>)}
      </ul>
    </div>
  );
};
