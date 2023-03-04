import React from 'react';
import { Catalog } from './components/Catalog';
import { Routes, Route } from 'react-router-dom';
import { NotFound } from './components/NotFound';
import { Category } from './components/Category';
import { Product } from './components/ProductPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Catalog />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/categories/:category" element={<Category />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
