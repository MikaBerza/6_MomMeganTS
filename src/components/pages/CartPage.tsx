import React from 'react';
import { useSelector } from 'react-redux';
import emptyCartImg from '../../assets/img/emptyCart.png';
import MainTitle from '../folderMainTitle/MainTitle';
import CartCard from '../folderCartCard/CartCard';
import OrderResult from '../folderOrderResult/OrderResult';
import ButtonGroup from '../folderButtonGroup/ButtonGroup';
import InsteadProduct from '../folderInsteadProduct/InsteadProduct';

type CartPageProps = {
  id: number
  imageUrl: string;
  title: string;
  types: number
  sizes: number[];
  price: number;
};
const CartPage: React.FC = () => {
  /* используем хук useSelector из библиотеки Redux 
     для получения значений (productCounter, priceCounter, cartData) из состояния,
     с помощью селектора cartOfProductsSlice */
  const { productCounter, cartData } = useSelector(
    (state: any) => state.cartOfProductsSlice
  );

  return productCounter > 0 ? (
    <>
      <MainTitle titleName='Корзина' />
      {cartData.map((obj: CartPageProps) => {
        return <CartCard key={obj.id} {...obj} />;
      })}
      <OrderResult />
      <ButtonGroup styleName={''} />
    </>
  ) : (
    <>
      <MainTitle
        titleName='Ваша корзина пуста...'
        styleName={'title-item-empty'}
      />
      <InsteadProduct img={emptyCartImg} />
      <ButtonGroup styleName={'hide-element'} />
    </>
  );
};

export default CartPage;
