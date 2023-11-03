import React from 'react';
import style from './NotFoundBlock.module.css';

function NotFoundBlock() {
  return (
    <>
      <span className={style['emoji']} role='img' aria-label='emoji'>
        &#10071;
      </span>
      <h1 className={style['title']}>Ничего не найдено</h1>
      <p className={style['description']}>К сожалению данные отсутствуют</p>
    </>
  );
}

export default NotFoundBlock;
