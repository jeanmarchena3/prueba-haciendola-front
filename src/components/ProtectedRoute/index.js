import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import MainLayout from '../Layout/MainLayout';

const ProtectedRoute = ({ isAuthenticated, setAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to='/' />;
  }

  return (
    <>
      <MainLayout setAuthenticated={setAuthenticated}>
        {children ? children : <Outlet />}
      </MainLayout>
    </>
  );
};

export default ProtectedRoute;
