import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPage } from '../../redux/slices/paginationSlice';
import style from './Pagination.module.css';
import { getAnArrayWithPageNumbers } from '../../modules/modules';
import { ProductType } from '../../@types/customType';

const Pagination: React.FC<{ initialProductData: ProductType[] }> = ({
  initialProductData,
}) => {
  /* используем хук useSelector из библиотеки Redux 
     для получения значений (numberOfCardsPerPage, currentPage) из состояния,
     с помощью селектора paginationSlice */
  const { numberOfCardsPerPage, currentPage } = useSelector(
    (state: any) => state.paginationSlice
  );
  const dispatch = useDispatch();
  const onClickGoToPage = (index: number) => {
    dispatch(setCurrentPage(index));
  };

  // массив номеров страниц
  const arrayOfPageNumbers = getAnArrayWithPageNumbers(
    initialProductData,
    numberOfCardsPerPage
  );

  return (
    <>
      <nav className={style['page-navigation']}>
        <ul className={style['pages-list']}>
          {arrayOfPageNumbers.map((item, index) => {
            return (
              <li className={style['page-item']} key={index}>
                <a
                  key={index}
                  onClick={() => onClickGoToPage(index)}
                  className={`${currentPage === index ? style['active'] : ''} ${
                    style['page-link']
                  } `}
                  href={`#page${currentPage + 1}`}
                >
                  {item}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default Pagination;
