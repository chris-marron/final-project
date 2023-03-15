import React, { useState, useEffect } from 'react';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [cartId, setCartId] = useState([]);

  const getCart = () => {
    fetch('http://localhost:3000/carts')
      .then(res => res.json())
      .then(data => setCart(data));
  };
  const deleteFromCart = cartId => {
    fetch(`http://localhost:3000/api/carts/${cartId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cartId })
    })
      .then(res => res.json())
      .then(data => (data))
      .catch(err => (err));
  };

  useEffect(() => {
    getCart();
  }, []);

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
                  <td><button onClick={deleteFromCart}>DELETE</button></td>
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
