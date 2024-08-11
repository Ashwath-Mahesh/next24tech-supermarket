// client/src/components/ItemList.js

import React from 'react';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001/api',
  timeout: 5000,
});

const ItemList = ({ items, fetchItems }) => {

  const handleDelete = async (id) => {
    try {
      await api.delete(`/items/${id}`);
      fetchItems(); // Notify the parent component to refresh the items
    } catch (err) {
      console.error('Error deleting item:', err);
    }
  };

  // Calculate the total amount
  const calculateTotalAmount = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  return (
    <div className="item-list">
      <h2>Item List</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <div><strong>{item.name}</strong></div>
            <div>Price: ${item.price}</div>
            <div>Quantity: {item.quantity}</div>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div className="total-amount">
        <h3>Total Amount: ${calculateTotalAmount()}</h3>
      </div>
    </div>
  );
};

export default ItemList;
