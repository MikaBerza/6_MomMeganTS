import React from 'react';
import { useSelector } from 'react-redux';
import style from './OrderResult.module.css';

const OrderResult: React.FC = () => {
  /* используем хук useSelector из библиотеки Redux 
     для получения значений (productCounter, priceCounter, cartData) из состояния,
     с помощью селектора cartOfProductsSlice */
  const { productCounter, priceCounter } = useSelector(
    (state: any) => state.cartOfProductsSlice
  );

  return (
    <div className={style['wrapper']}>
      <p className={style['in-total']}>
        Всего:{' '}
        <b className={style['number']}>{productCounter.toLocaleString()} шт.</b>
      </p>
      <p className={style['amount']}>
        Сумма:{' '}
        <b className={style['number']}>{priceCounter.toLocaleString()} ₽</b>
      </p>
    </div>
  );
};

export default OrderResult;
