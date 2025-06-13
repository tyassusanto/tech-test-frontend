import React from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../app/features/authentication';
import Layout from '../components/Layout';

const DashboardPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  }
  return (
    <Layout>
      Dashboard Page <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
      >
        Logout
      </button>

      <Link to={'/master-gate'}>To Master Gate</Link>
    </Layout>
  )
}

export default DashboardPage
