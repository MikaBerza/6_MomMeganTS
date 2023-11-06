import React from 'react';
import style from './NotFoundBlock.module.css';
import { NotFoundBlockPropsType } from '../../@types/customType';

const NotFoundBlock: React.FC<NotFoundBlockPropsType> = ({ title, description }) => {
  return (
    <>
      <span className={style['emoji']} role='img' aria-label='emoji'>
        &#10071;
      </span>
      <h1 className={style['title']}>{title}</h1>
      <p className={style['description']}>{description}</p>
    </>
  );
};

export default NotFoundBlock;
