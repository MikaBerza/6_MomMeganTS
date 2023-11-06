export type LocalStorageType = {
  dateValue: Date;
  searchValue: string;
  filteringValue: number;
  sortValue: number;
  currentPageValue: number;
  productCounterValue: number;
  priceCounterValue: number;
  cartDataValue: ProductCartType[];
};

export type ProductType = {
  id: number;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
};

export type ProductCartType = {
  id: string;
  imageUrl: string;
  title: string;
  type: number;
  sizes: number;
  price: number;
};

export type ButtonPropsType = {
  nameBtn?: string;
  nameStyle: string[];
  handleClick?: () => void;
};

export type ButtonGroupPropsType = {
  styleName: string;
};

export type FilteringPropsType = {
  valueId: number;
};

export type InsteadProductPropsType = {
  img: string;
};

export type MainTitlePropsType = {
  titleName: string;
  styleName?: string;
};

export type SortPropsType = {
  valueId: number;
  updateProductData: ProductType[];
  setUpdateProductData: Function;
};

export type NotFoundBlockPropsType = {
  title: string;
  description: string;
};

export type CartInitialStateType = {
  productCounter: number;
  priceCounter: number;
  cartData: ProductCartType[];
};

export type PaginationInitialStateType = {
  numberOfCardsPerPage: number;
  currentPage: number;
};

export type SortingAndFilteringInitialStateType = {
  filteringId: number;
  sortId: number;
  searchValue: string;
};
