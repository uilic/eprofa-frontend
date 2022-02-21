import React from 'react'

import { useContext} from "react";
import AuthContext from './AuthProvider'
import { useLocation, Navigate } from 'react-router-dom'

function RequireAuth({ children }) {

    const { auth } = useContext(AuthContext);
    const location = useLocation();

    return auth === true
    ? children
    : <Navigate to="/prijava" replace state={{ path: location.pathname }}
    />;
}

  export default RequireAuth;