import { configureStore } from '@reduxjs/toolkit'

import authReducer from './features/authentication'
import masterGateReducer from './features/masterGatesSlice'
import trafficReducer from './features/trafficSlice'

export const store = configureStore({
  reducer: {
    authentication: authReducer,
    masterGate: masterGateReducer,
    traffic: trafficReducer
  },
});
