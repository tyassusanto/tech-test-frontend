import React from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import MasterGateForm from '../components/MasterGate/MasterGateForm'
import MasterGateData from '../components/MasterGateData'

const MasterGate = () => {
  return (
    <Layout>
      Master Gate <br />
      <MasterGateForm />
      <MasterGateData />

      <Link to={'/'}>To Dashboard</Link>
    </Layout>
  )
}

export default MasterGate
