import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Navbar } from './Navbar';

export const Product = ({ item }) => {
  const { id } = useParams();
  const [Sdata, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const catalogItems = () => {
    const options = {
      method: 'GET',
      url: `http://localhost:3000/products/${id}`,
      headers: { 'Content-Type': 'application/json' }
    };
    axios.request(options).then(response => {
      setData(response.data.product);
      setIsLoaded(true);
    }).catch(error => {
      console.error(error);
      setIsLoaded(true);
      setError(error);
    });
  };
  useEffect(() => {
    catalogItems();
  });

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Navbar/>
      <div className='py-10' ><h1>hello</h1></div>
    </>
  );
};
