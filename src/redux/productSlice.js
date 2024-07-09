// productSlice.js
import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    nombre: '',
    disenador: '',
  },
  reducers: {
    updateNombre: (state, action) => {
      state.nombre = action.payload.toUpperCase();
    },
    // otros reducers...
  },
});

export const { updateNombre } = productSlice.actions;
export default productSlice.reducer;