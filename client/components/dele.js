const deleteFromCart = (cartId, callback) => {
  fetch(`http://localhost:3000/api/carts/${cartId}`, {
    method: 'DELETE'
  })
    .then(res => res.json())
    .then(data => callback(data))
    .catch(err => callback(null, err));
};

module.exports = { deleteFromCart };
