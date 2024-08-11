// client/src/components/ItemForm.js

import React, { useState } from 'react';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001/api', // Update port number if changed
  timeout: 5000,
});

const ItemForm = ({ addItem }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/items', { name, price, quantity });
      addItem(response.data);
      setName('');
      setPrice('');
      setQuantity('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="item-form">
      <h2>Add New Item</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default ItemForm;
