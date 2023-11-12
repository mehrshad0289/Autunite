import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/userSlice';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';


function Dashboard() {
  const user = useSelector(selectUser);

  return (
    <>
      {user && user.role && user.role.includes('admin') || user.role.includes('superadmin') ? (<AdminDashboard />) : (<UserDashboard />)
      }
    </>
  );
}

export default Dashboard;
