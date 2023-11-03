import { configureStore } from '@reduxjs/toolkit';
import sortingAndFilteringSlice from './slices/sortingAndFilteringSlice';
import paginationSlice from './slices/paginationSlice';
import cartOfProductsSlice from './slices/cartOfProductsSlice';

export const store = configureStore({
  reducer: {
    sortingAndFilteringSlice: sortingAndFilteringSlice,
    paginationSlice: paginationSlice,
    cartOfProductsSlice: cartOfProductsSlice,
  },
});
