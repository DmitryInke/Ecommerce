import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingToRedirect from './LoadingToRedirect';

export const UserRoute = () => {
  const { user } = useSelector(state => ({ ...state }));
  return user && user.token ? <Outlet /> : <LoadingToRedirect />;
};
export default UserRoute;
