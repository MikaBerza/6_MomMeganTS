import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSortId } from '../../redux/slices/sortingAndFilteringSlice';
import style from './Sort.module.css';
import { listOfNamesOfSortingElements } from '../../assets/listsWithNames';
import { getSortedData } from '../../modules/modules';
import { SortPropsType  } from '../../@types/customType';

const Sort: React.FC<SortPropsType > = ({
  valueId,
  updateProductData,
  setUpdateProductData,
}) => {
  const { searchValue } = useSelector(
    (state: any) => state.sortingAndFilteringSlice
  );
  const dispatch = useDispatch();

  const searchItemName = listOfNamesOfSortingElements[valueId];
  const [open, setOpen] = React.useState(false);
  /* Используем хук useRef из библиотеки React для создания ссылки на DOM-элемент.
  Чтобы обратиться к DOM элементу через React */
  const sortRef = React.useRef<HTMLDivElement>(null);

  const onClickSorting = (index: number) => {
    dispatch(setSortId(index));
    const newProductsCardsFragment = getSortedData(updateProductData, index);
    setUpdateProductData(newProductsCardsFragment);
    setOpen(false);
  };

  React.useEffect(() => {
    /*____Код, выполняемый после монтирования компонента____*/
    // получаем элемент страницы
    const elementBody = document.querySelector('body');
    // функция, закрыть по клику вне списка сортировки
    const closeOnClickOutsideTheListSort = (event: any) => {
      /* composedPath() - возвращает массив элементов, 
      начиная с целевого элемента события и до корневого элемента документа */
      const arrElem = event.composedPath();
      const elem = sortRef.current;
      if (!arrElem.includes(elem)) {
        setOpen(false);
      }
    };

    if (elementBody !== null) {
      // навешиваем обработчик события
      elementBody.addEventListener('click', closeOnClickOutsideTheListSort);

      /*____Код, выполняемый перед демонтажем компонента____*/
      return () => {
        // удаляем обработчик события
        elementBody.removeEventListener(
          'click',
          closeOnClickOutsideTheListSort
        );
      };
    }
  }, []);

  return (
    <div
      className={
        searchValue.trim().length !== 0
          ? `${style['container']} ${'not-visible-element'}`
          : style['container']
      }
      ref={sortRef}
    >
      <div className={style['label']}>
        <svg
          className={style['img']}
          width='10'
          height='6'
          viewBox='0 0 10 6'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z'
            fill='#2C2C2C'
          />
        </svg>
        <span className={style['text-bold']}>Сортировка по:</span>
        <span
          className={style['text-normal']}
          onClick={() => {
            setOpen(!open);
          }}
        >
          {searchItemName}
        </span>
      </div>
      {open && (
        <div className={style['popup']}>
          <ul className={style['list']}>
            {listOfNamesOfSortingElements.map((item, index) => {
              return (
                <li
                  key={index}
                  onClick={() => {
                    onClickSorting(index);
                  }}
                  className={`${valueId === index ? style['active'] : ''} ${
                    style['list-item']
                  }
                `}
                >
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
