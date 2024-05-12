import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import './App.css';

import ProtectedRoute from './components/ProtectedRoute';

import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import ProductsList from './components/Products/List';
import FormProduct from './components/Products/FormProduct';
import NotAuthorized from './components/NotAuthorized';
import { decryptData } from './config/crypto';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const autenticatedUser = async () =>{
      try {
        decryptData('user');
        setIsAuthenticated(true);
        navigate('/productos');
      } catch (error) {
        setIsAuthenticated(false);
        navigate('/');
      }
    };
    autenticatedUser();
  }, []);

  return (
    <div>
      <Routes>
        <Route index element={!isAuthenticated ? <Login setIsAuthenticated={setIsAuthenticated}/> : <Navigate to='/productos' />} />
        <Route path='/login' element={!isAuthenticated ? <Login setIsAuthenticated={setIsAuthenticated}/> : <Navigate to='/productos' />} />
        <Route path='/recuperar-contrasena' element={!isAuthenticated ? <ForgotPassword /> : <Navigate to='/productos'/>} />
        <Route path='/no-autorizado' element={NotAuthorized} />

        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} setAuthenticated={setIsAuthenticated}/>}>
          <Route path='/productos' element={<ProductsList />} />
          <Route path='/productos/crear' element={<FormProduct />} />
          <Route path='/productos/:id/editar' element={<FormProduct />} />
        </Route>
        {/* <Route path='*' element={<Login />} /> */}
      </Routes>
    </div>
  );
};

export default App;
