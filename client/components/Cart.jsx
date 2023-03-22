import React, { useState, useEffect } from 'react';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await fetch('http://localhost:3000/carts');
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      setCart(data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteFromCart = async cartId => {
    try {
      const response = await fetch(`http://localhost:3000/api/carts/${cartId}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      if (response.status !== 204) {
        const data = await response.json();
        setMessage(data.message);
      } else {
        setMessage('Item deleted from cart');
      }

      fetchCart();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = cartId => {
    deleteFromCart(cartId);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1 className="text-center">Cart</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cart.map(item => (
                <tr key={item.cartId}>
                  <td><img src={item.imageUrl} alt="" /></td>
                  <td>{item.name}</td>
                  <td>{`$${item.price}`}</td>
                  <td>{item.quantity}</td>
                  <td>{`$${item.price}`}</td>
                  <td><button onClick={() => { handleDelete(item.cartId); }}>DELETE</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Cart;
