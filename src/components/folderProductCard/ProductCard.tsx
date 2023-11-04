import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import {
  setProductCounter,
  setPriceCounter,
  setCartData,
} from '../../redux/slices/cartOfProductsSlice';

import style from './ProductCard.module.css';
import { listOfSeasonTitles } from '../../assets/listsWithNames.js';
import { v4 as uuidv4 } from 'uuid';
import Button from '../folderButton/Button';

type ProductCardProps = {
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  rating: number;
};

const ProductCard: React.FC<ProductCardProps> = ({
  imageUrl,
  title,
  types,
  sizes,
  price,
  rating,
}) => {
  const [activeType, setActiveType] = React.useState(0);
  const [activeSize, setActiveSize] = React.useState(0);
  /* используем хук useSelector из библиотеки Redux 
     для получения значений (productCounter, priceCounter, cartData) из состояния,
     с помощью селектора cartOfProductsSlice */
  const { productCounter, priceCounter, cartData } = useSelector(
    (state: any) => state.cartOfProductsSlice
  );

  const dispatch = useDispatch();

  // функция, добавить товар в корзину
  const addAnItemToTheCart = () => {
    // формируем, данные добавленного товара в корзину
    const dataOfTheAddedProduct = {
      id: uuidv4(),
      imageUrl: imageUrl,
      title: title,
      types: types[activeType],
      sizes: sizes[activeSize],
      price: price,
    };
    // копируем данные товара с помощью оператора spread
    const copyCartData = [...cartData];
    // обновляем данные в корзине
    copyCartData.push(dataOfTheAddedProduct);
    dispatch(setCartData(copyCartData));

    // записываем новые значения счетчиков в константы
    const updatedProductCounter = productCounter + 1;
    const updatePriceCounter = priceCounter + price;
    // обновляем значения счетчиков товаров и цен
    dispatch(setProductCounter(updatedProductCounter));
    dispatch(setPriceCounter(updatePriceCounter));
  };

  return (
    <div className={style['warper']}>
      <img className={style['image']} src={imageUrl} alt='product' />
      <div className={style['title']}>
        <h4 className={style['title-text']}>{title}</h4>
        <svg
          className={style['title-stars']}
          width='30px'
          height='30px'
          viewBox='0 0 576 512'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z' />
        </svg>
        <span className={style['title-rating']}>{rating}</span>
      </div>
      <div className={style['selector']}>
        <ul className={style['list']}>
          {types.map((item, index) => {
            return (
              <li
                key={index}
                onClick={() => setActiveType(index)}
                className={`${activeType === index ? style.active : ''} ${
                  style['list-item']
                }`}
              >
                {listOfSeasonTitles[item]}
              </li>
            );
          })}
        </ul>
        <ul className={style['list']}>
          {sizes.map((item, index) => {
            return (
              <li
                key={index}
                onClick={() => setActiveSize(index)}
                className={`${activeSize === index ? style.active : ''} ${
                  style['list-item']
                }`}
              >
                {item}
              </li>
            );
          })}
        </ul>
      </div>
      <div className={style['footer']}>
        <div className={style['price']}>{price.toLocaleString()} ₽</div>
        <Button
          handleClick={addAnItemToTheCart}
          nameBtn={'Добавить'}
          nameStyle={['button_v1', 'button-icon_v1', 'button-name_v1']}
        />
      </div>
    </div>
  );
};

export default ProductCard;
