import React from 'react';
import style from './insteadProduct.module.css';

function InsteadProduct({ img }) {
  return (
    <div className={style['img']}>
      <img className={style['img-item']} src={img} alt='img' />
    </div>
  );
}

export default InsteadProduct;
