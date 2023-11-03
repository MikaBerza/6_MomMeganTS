import { createSlice } from '@reduxjs/toolkit';

// первое состояние
const initialState = {
  numberOfCardsPerPage: 8,
  currentPage: 0,
};

export const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setNumberOfCardsPerPage(state, action) {
      state.numberOfCardsPerPage = action.payload;
    },

    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
});

export const { setNumberOfCardsPerPage, setCurrentPage } =
  paginationSlice.actions;

export default paginationSlice.reducer;
