import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';
import axiosClient from '../api/axiosClient';

// fetch
export const fetchTreatments = createAsyncThunk('treatments/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosClient.get('/treatments');
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data || { message: err.message || 'Fetch failed' });
  }
});

// save new (POST)
export const saveNewTreatments = createAsyncThunk('treatments/saveNew', async (unsaved, { rejectWithValue }) => {
  try {
    const payload = unsaved.map((t) => ({ name: t.name }));
    const { data } = await axiosClient.post('/treatments', payload);
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data || { message: err.message || 'Save failed' });
  }
});

// delete
export const deleteTreatment = createAsyncThunk('treatments/delete', async ({ id }, { rejectWithValue }) => {
  try {
    await axiosClient.delete(`/treatments/${id}`);
    return { id };
  } catch (err) {
    return rejectWithValue(err.response?.data || { message: err.message || 'Delete failed' });
  }
});

const slice = createSlice({
  name: 'treatments',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    saving: 'idle',
    deleting: {},
  },
  reducers: {
    addLocalTreatment: {
      reducer(state, action) {
        state.items.push(action.payload);
      },
      prepare(name) {
        return { payload: { tempId: nanoid(), name, pending: true } };
      },
    },
    removeLocalTreatment(state, action) {
      const { tempId } = action.payload;
      state.items = state.items.filter((t) => t.tempId !== tempId);
    },
    clearTreatments(state) {
      state.items = [];
      state.status = 'idle';
      state.error = null;
      state.saving = 'idle';
      state.deleting = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTreatments.pending, (state) => { state.status = 'loading'; state.error = null; })
      .addCase(fetchTreatments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = (action.payload || []).map((t) => ({ id: t.id ?? t._id, name: t.name }));
      })
      .addCase(fetchTreatments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Fetch failed';
      })

      .addCase(saveNewTreatments.pending, (state) => { state.saving = 'loading'; })
      .addCase(saveNewTreatments.fulfilled, (state, action) => {
        state.saving = 'succeeded';
        const serverSaved = (action.payload || []).map((s) => ({ id: s.id ?? s._id, name: s.name }));
        const existingServer = state.items.filter((t) => !t.pending);
        state.items = [...existingServer, ...serverSaved];
      })
      .addCase(saveNewTreatments.rejected, (state, action) => {
        state.saving = 'failed';
        state.error = action.payload?.message || 'Save failed';
      })

      .addCase(deleteTreatment.pending, (state, action) => {
        const id = action.meta.arg.id;
        state.deleting[id] = true;
      })
      .addCase(deleteTreatment.fulfilled, (state, action) => {
        const { id } = action.payload;
        delete state.deleting[id];
        state.items = state.items.filter((t) => t.id !== id);
      })
      .addCase(deleteTreatment.rejected, (state, action) => {
        const id = action.meta.arg.id;
        delete state.deleting[id];
        state.error = action.payload?.message || 'Delete failed';
      });
  },
});

export const { addLocalTreatment, removeLocalTreatment, clearTreatments } = slice.actions;
export const selectTreatments = (state) => state.treatments.items;
export const selectTreatmentsStatus = (state) => state.treatments.status;
export const selectSavingStatus = (state) => state.treatments.saving;
export default slice.reducer;