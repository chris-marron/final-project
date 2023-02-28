import React from 'react';
import { Catalog } from './components/Catalog';
import { Routes, Route } from 'react-router-dom';
import { NotFound } from './components/NotFound';
import { Navbar } from './components/Navbar';
import { Category } from './components/Category';
import { Product } from './components/Product';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Catalog />} />
      <Route patj="/product/categories/:category" element={<Category />} />
      <Route path="*" element={<NotFound />} />
    </Routes>

  );
};

export default App;
