import React from 'react';
import api from '../api';

const Item = ({ item, fetchItems }) => {
  const handleDelete = async () => {
    try {
      await api.delete(`/items/${item._id}`);
      fetchItems();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h3>{item.name}</h3>
      <p>Price: ${item.price}</p>
      <p>Quantity: {item.quantity}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Item;
