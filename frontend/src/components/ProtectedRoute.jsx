import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const isAuthenticated = useSelector((state) => state.session.user !== null);

    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
            }
        />
    );
};

export default ProtectedRoute;
