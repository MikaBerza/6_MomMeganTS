import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import {
  setProductCounter,
  setPriceCounter,
  setCartData,
} from '../../redux/slices/cartOfProductsSlice';

import style from './CartCard.module.css';
import { listOfSeasonTitles } from '../../assets/listsWithNames';
import Button from '../folderButton/Button';

function CartCard({ id, imageUrl, title, types, sizes, price }) {
  /* используем хук useSelector из библиотеки Redux 
     для получения значений (productCounter, priceCounter, cartData) из состояния,
     с помощью селектора cartOfProductsSlice */
  const { productCounter, priceCounter, cartData } = useSelector(
    (state) => state.cartOfProductsSlice
  );
  const dispatch = useDispatch();

  // функция, удалить товар из корзины
  const removeItemFromCart = () => {
    const confirmation = window.confirm(
      'Вы действительно хотите удалить товар из корзины?'.toUpperCase()
    );
    if (confirmation) {
      // копируем данные товара с помощью оператора spread
      const copyCartData = [...cartData];
      // удаляем выбранные данные из корзины
      const newCartData = copyCartData.filter((item) => item.id !== id);
      // обновляем данные в корзине
      dispatch(setCartData(newCartData));

      // записываем новые значения счетчиков в константы
      const updatedProductCounter = productCounter - 1;
      const updatePriceCounter = priceCounter - price;
      // обновляем значения счетчиков товаров и цен
      dispatch(setProductCounter(updatedProductCounter));
      dispatch(setPriceCounter(updatePriceCounter));
    }
  };

  return (
    <div className={style['wrapper']}>
      <div className={style['product']}>
        <div className={style['images']}>
          <img className={style['images-item']} src={imageUrl} alt='Product' />
        </div>
        <div className={style['info']}>
          <h3 className={style['title']}>{title}</h3>
          <p className={style['description']}>
            {listOfSeasonTitles[types]}, {sizes}
          </p>
        </div>
      </div>
      <div className={style['control-buttons']}>
        <div className={style['text-price']}>
          <span className={style['text-price-item']}>
            {price.toLocaleString()} ₽
          </span>
        </div>
        <div className={style['inner']}>
          <Button
            handleClick={removeItemFromCart}
            nameStyle={['button_v2', 'button-icon_v3', 'button-name_v2']}
          />
        </div>
      </div>
    </div>
  );
}

export default CartCard;
