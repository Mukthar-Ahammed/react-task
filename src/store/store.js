import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer, { logout as authLogout } from '../features/authSlice';
import treatmentsReducer from '../features/treatmentSlice';

const appReducer = combineReducers({
  auth: authReducer,
  treatments: treatmentsReducer,
});


const rootReducer = (state, action) => {
  if (action.type === authLogout.type) {
    state = undefined;
  }
  return appReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefault) =>
    getDefault({
      serializableCheck: false,
    }),
});

export default store;