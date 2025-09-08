import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  items: [
    { id: '1', name: 'Chemotherapy' },
    { id: '2', name: 'Radiation Therapy' },
  ],
};

const treatmentSlice = createSlice({
  name: 'treatments',
  initialState,
  reducers: {
    addLocalTreatment: {
      reducer(state, action) {
        state.items.push(action.payload);
      },
      prepare(name) {
        return { payload: { id: nanoid(), name, pending: true } };
      },
    },
    removeLocalTreatment(state, action) {
      state.items = state.items.filter((t) => t.id !== action.payload);
    },
    saveNewTreatments(state) {
      state.items = state.items.map((t) => ({ ...t, pending: false }));
    },
    clearTreatments() {
      return initialState;
    },
  },
});

export const {
  addLocalTreatment,
  removeLocalTreatment,
  saveNewTreatments,
  clearTreatments,
} = treatmentSlice.actions;

export const selectTreatments = (state) => state.treatments.items;

export default treatmentSlice.reducer;
