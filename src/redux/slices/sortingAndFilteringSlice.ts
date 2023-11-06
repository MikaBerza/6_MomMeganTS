import { createSlice } from '@reduxjs/toolkit';
import { SortingAndFilteringInitialStateType } from '../../@types/customType';

// первое состояние
const initialState: SortingAndFilteringInitialStateType = {
  filteringId: 0,
  sortId: 0,
  searchValue: '',
};

export const sortingAndFilteringSlice = createSlice({
  name: 'sortingAndFiltering',
  initialState,
  reducers: {
    setFilteringId(state, action) {
      state.filteringId = action.payload;
    },

    setSortId(state, action) {
      state.sortId = action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
  },
});

export const { setFilteringId, setSortId, setSearchValue } =
  sortingAndFilteringSlice.actions;

export default sortingAndFilteringSlice.reducer;
