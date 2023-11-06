import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import emptyCartImg from '../../assets/img/emptyCart.png';
import MainTitle from '../folderMainTitle/MainTitle';
import CartCard from '../folderCartCard/CartCard';
import OrderResult from '../folderOrderResult/OrderResult';
import ButtonGroup from '../folderButtonGroup/ButtonGroup';
import InsteadProduct from '../folderInsteadProduct/InsteadProduct';
import { ProductCartType } from '../../@types/customType';

const CartPage: React.FC = () => {
  /* используем хук useSelector из библиотеки Redux 
     для получения значений (productCounter, priceCounter, cartData) из состояния,
     с помощью селектора cartOfProductsSlice */
  const { productCounter, cartData } = useSelector(
    (state: RootState) => state.cartOfProductsSlice
  );

  return productCounter > 0 ? (
    <>
      <MainTitle titleName='Корзина' />
      {cartData.map((obj: ProductCartType) => {
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
