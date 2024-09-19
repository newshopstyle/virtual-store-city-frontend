import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Store from './pages/Store';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/store/:id" element={<Store />} />
      </Routes>
    </Router>
  );
}

export default App;
import './App.css';
import PrivateRoute from './components/PrivateRoute';

// Внутри <Routes>
<Route
  path="/store/:id"
  element={
    <PrivateRoute>
      <Store />
    </PrivateRoute>
  }
/>
import CreateStore from './pages/CreateStore';

// Внутри <Routes>
<Route
  path="/create-store"
  element={
    <PrivateRoute>
      <CreateStore />
    </PrivateRoute>
  }
/>
import AddProduct from './pages/AddProduct';

// Внутри <Routes>
<Route
  path="/add-product"
  element={
    <PrivateRoute>
      <AddProduct />
    </PrivateRoute>
  }
/>
