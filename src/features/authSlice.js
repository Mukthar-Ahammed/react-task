import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null },
  reducers: {
    login: (state, action) => {
      state.user = { email: action.payload.email };
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export const selectIsAuthed = (state) => Boolean(state.auth.user);

export default authSlice.reducer;
