// src/auth/PrivateAuthRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from './useUser';

const PrivateAuthRoute = () => {
    const user = useUser();

    return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateAuthRoute;
