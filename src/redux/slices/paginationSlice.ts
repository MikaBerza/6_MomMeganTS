import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PaginationInitialStateType } from '../../@types/customType';

// первое состояние
const initialState: PaginationInitialStateType = {
  numberOfCardsPerPage: 8,
  currentPage: 0,
};

export const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setNumberOfCardsPerPage(state, action: PayloadAction<number>) {
      state.numberOfCardsPerPage = action.payload;
    },

    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
});

export const { setNumberOfCardsPerPage, setCurrentPage } =
  paginationSlice.actions;

export default paginationSlice.reducer;
