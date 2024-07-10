import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';
import AddProductPage from './pages/AddProductPage';
import EditProductPage from './pages/EditProductPage';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/products" />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/create" element={<AddProductPage />} />
        <Route path="/products/edit/:id" element={<EditProductPage />} />
      </Routes>
    </div>
  );
}

export default App;
