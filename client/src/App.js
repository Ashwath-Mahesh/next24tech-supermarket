// client/src/App.js

import React, { useState, useEffect } from 'react';
import './App.css';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001/api',
  timeout: 5000,
});

function App() {
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    try {
      const response = await api.get('/items');
      setItems(response.data);
    } catch (err) {
      console.error('Error fetching items:', err);
    }
  };

  useEffect(() => {
    fetchItems(); // Fetch items when the component mounts
  }, []);

  const addItem = (newItem) => {
    setItems(prevItems => [...prevItems, newItem]);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/items/${id}`);
      fetchItems(); // Refresh items after deletion
    } catch (err) {
      console.error('Error deleting item:', err);
    }
  };

  return (
    <div className="App">
      <header className="header">
        <h1>Supermarket Billing System</h1>
      </header>
      <div className="container">
        <div className="main-content">
          <ItemForm addItem={addItem} />
          <ItemList items={items} fetchItems={fetchItems} />
        </div>
      </div>
    </div>
  );
}

export default App;
