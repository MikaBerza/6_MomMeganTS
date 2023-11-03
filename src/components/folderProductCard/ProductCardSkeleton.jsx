import React from 'react';
import ContentLoader from 'react-content-loader';
import style from './ProductCard.module.css';

const ProductCardSkeleton = () => (
  <ContentLoader
    className={style['product-card']}
    speed={1}
    width={367}
    height={433}
    viewBox='0 0 367 433'
    backgroundColor='#f3f3f3'
    foregroundColor='#ecebeb'
  >
    <rect x='8' y='5' rx='0' ry='0' width='357' height='423' />
  </ContentLoader>
);

export default ProductCardSkeleton;
