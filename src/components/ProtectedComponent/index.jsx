import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { authUserSelector } from '../../redux/auth/auth.selectors';

function ProtectedComponent({ children }) {
  const authUser = useSelector(authUserSelector);
  const { pathname } = useLocation();
  return authUser ? (
    children
  ) : (
    <Navigate
      to={{
        pathname: '/login',
      }}
      state={{ from: pathname }}
    />
  );
}

ProtectedComponent.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedComponent;
