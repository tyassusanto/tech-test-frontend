import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import Public from './utils/Public'
import Protected from './utils/Protected'
import DashboardPage from './pages/DashboardPage'
import MasterGate from './pages/MasterGate'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Public><LoginPage /></Public>} />
        <Route path='/' element={<Protected><DashboardPage /></Protected>} />
        <Route path='/master-gate' element={<Protected><MasterGate /></Protected>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
