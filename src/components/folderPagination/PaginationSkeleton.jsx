import React from 'react';
import ContentLoader from 'react-content-loader';
import style from './Pagination.module.css';

function PaginationSkeleton() {
  return (
    <nav className={style['page-navigation']}>
      <ContentLoader
        speed={1}
        width={350}
        height={70}
        viewBox='0 0 350 70'
        backgroundColor='#f3f3f3'
        foregroundColor='#ecebeb'
      >
        <rect x='0' y='5' rx='5' ry='5' width='350' height='50' />
      </ContentLoader>
    </nav>
  );
}

export default PaginationSkeleton;
