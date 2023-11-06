import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CartInitialStateType, ProductCartType } from '../../@types/customType';

// первое состояние
const initialState: CartInitialStateType = {
  productCounter: 0,
  priceCounter: 0,
  cartData: [],
};

export const cartOfProductsSlice = createSlice({
  name: 'cartOfProducts',
  initialState,
  reducers: {
    setProductCounter(state, action: PayloadAction<number>) {
      state.productCounter = action.payload;
    },
    setPriceCounter(state, action: PayloadAction<number>) {
      state.priceCounter = action.payload;
    },
    setCartData(state, action: PayloadAction<ProductCartType[]>) {
      state.cartData = action.payload;
    },
  },
});

export const { setProductCounter, setPriceCounter, setCartData } =
  cartOfProductsSlice.actions;

export default cartOfProductsSlice.reducer;
