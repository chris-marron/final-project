import React, { useState } from 'react';

const Cart = ({ product }) => {
  const [cart, setCart] = useState([]);
  const addToCart = () => {
    setCart([...cart, product]);
  };

  return (
    <button onClick={addToCart}>Add to Cart</button>
  );
};

export default Cart;
