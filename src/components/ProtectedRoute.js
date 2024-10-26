import React from 'react';
import { Navigate } from 'react-router-dom';
const ProtectedRoute = ({ children }) => {
  const accesstoken = localStorage.getItem('Token'); 
  if (!accesstoken) {
    return <Navigate to="/" replace />; 
  }
  return children; 
};
export default ProtectedRoute;
 