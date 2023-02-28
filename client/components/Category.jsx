import React, { useState, useEffect } from 'react';
import { Navbar } from './Navbar';
import { Carasouel } from './Carasouel';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const Category = () => {
  const { category } = useParams();
  const [Sdata, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const catalogItems = () => {
    const options = {
      method: 'GET',
      url: `http://localhost:3000/products/category/${category}`,
      headers: { 'Content-Type': 'application/json' }
    };
    axios.request(options).then(response => {
      setData(response.data.products);
      setIsLoaded(true);
    }).catch(error => {
      console.error(error);
      setIsLoaded(true);
      setError(error);
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
    <div>Category</div>
  );
};
