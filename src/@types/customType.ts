export type LocalStorageType = {
  dateValue: Date;
  searchValue: string;
  filteringValue: number;
  sortValue: number;
  currentPageValue: number;
  productCounterValue: number;
  priceCounterValue: number;
  cartDataValue: [];
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
  id: number
  imageUrl: string;
  title: string;
  type: number
  sizes: number[];
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

export type FilteringProps = {
  valueId: number;
};

export type InsteadProductProps = {
  img: string;
};

export type MainTitleProps = {
  titleName: string;
  styleName?: string;
};

export type SortProps = {
  valueId: any;
  updateProductData: any;
  setUpdateProductData: any;
};