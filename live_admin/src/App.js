import React from 'react';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import Dashboard from './component/dashboard/Dashboard';
import Signup from './component/signup/Signup.js';
import { Login } from './component/login/Login.jsx';
import Brand from './component/brand/Brand.js';
import MainCategory from './component/mainCategory/mainCategory.js';
import Category from './component/category/Category.js';
import SubCategory from './component/subcategory/SubCategory.js';
import Product from './component/product/Product.js';
function App() {
  return (
    <>
      <BrowserRouter>

        <Routes>

          <Route path="/" element={<Dashboard />} />
          <Route path="sign-up" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="brand" element={<Brand />} />
          <Route path="main-category" element={<MainCategory />} />
          <Route path="category" element={<Category />} />
          <Route path="sub-category" element={<SubCategory />} />
          <Route path="product" element={<Product />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
