import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import basicReducer from './basicSlice';


const store = configureStore({
  reducer: {
    user: userReducer,
    basic: basicReducer,
  },
});

export default store;
