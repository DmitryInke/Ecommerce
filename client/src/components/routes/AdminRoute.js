import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingToRedirect from './LoadingToRedirect';
import { currentAdmin } from '../../functions/auth';

export const AdminRoute = () => {
  const { user } = useSelector(state => ({ ...state }));
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then(res => {
          setOk(true);
        })
        .catch(error => {
          setOk(false);
        });
    }
  }, [user, setOk]);

  return ok ? <Outlet /> : <LoadingToRedirect />;
};
export default AdminRoute;
