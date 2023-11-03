import React from 'react';

import { useSelector } from 'react-redux';

import emptyCartImg from '../../assets/img/emptyCart.png';

import MainTitle from '../folderMainTitle/MainTitle';
import CartCard from '../folderCartCard/CartCard';
import OrderResult from '../folderOrderResult/OrderResult';
import ButtonGroup from '../folderButtonGroup/ButtonGroup';
import InsteadProduct from '../folderInsteadProduct/InsteadProduct';

function CartPage() {
  /* используем хук useSelector из библиотеки Redux 
     для получения значений (productCounter, priceCounter, cartData) из состояния,
     с помощью селектора cartOfProductsSlice */
  const { productCounter, cartData } = useSelector(
    (state) => state.cartOfProductsSlice
  );

  return productCounter > 0 ? (
    <>
      <MainTitle titleName='Корзина' />
      {cartData.map((obj) => {
        return <CartCard key={obj.id} {...obj} />;
      })}
      <OrderResult />
      <ButtonGroup />
    </>
  ) : (
    <>
      <MainTitle titleName='Ваша корзина пуста...' styleName={'title-item-empty'}/>
      <InsteadProduct img={emptyCartImg} />
      <ButtonGroup styleName={'hide-element'} />
    </>
  );
}

export default CartPage;
