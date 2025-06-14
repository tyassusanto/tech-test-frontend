import React from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import BaseLayout from '../components/BaseLayout';
import { logout } from '../app/features/authentication';

const DashboardPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  }
  return (
    <BaseLayout>
      Dashboard Page <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
      >
        Logout
      </button>

      <Link to={'/master-gate'}>To Master Gate</Link>
    </BaseLayout>
  )
}

export default DashboardPage
