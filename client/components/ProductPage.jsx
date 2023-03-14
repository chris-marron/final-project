import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Navbar } from './Navbar';
// import Cart from './Cart';

export const Product = ({ item }) => {
  const { id } = useParams();
  const [Sdata, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3000/api/products/${id}`)
      .then(res => res.json())
      .then(data => { setData(data); setIsLoaded(true); })
      .catch(err => { setError(err); setIsLoaded(true); });
  }, [id]);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  }
  const addToCart = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId: Sdata.productId })
    };
    fetch('http://localhost:3000/api/carts', requestOptions)
      .then(res => res.json())
      .then(data => (data))
      .catch(err => (err));

  };
  return (
    <>
      <Navbar/>
      <div className="container mx-auto my-20 px-4 md:px-0">
        <div className="flex flex-wrap items-center">
          <div className="w-full md:w-1/2 md:pr-8 mb-8 md:mb-0">
            <img src={Sdata.imageUrl} alt="Product Image" className="w-full h-100 object-cover rounded-md shadow-md" />
          </div>
          <div className="w-full md:w-1/2">
            <h1 className="text-3xl font-bold mb-2">{Sdata.name}</h1>
            <p className="text-lg text-gray-600 mb-4">{Sdata.description}</p>
            <p className="text-lg font-bold mb-4">{`$${Sdata.price}`}</p>
            <button className="bg-black text-white px-6 md:px-10 py-2 rounded-md hover:bg-gray-800 transition-colors shadow-md" onClick={addToCart}>Add to Cart</button>
          </div>
        </div>
      </div>

    </>
  );
};
