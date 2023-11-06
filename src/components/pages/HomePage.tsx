import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { ProductType } from '../../@types/customType';

import {
  getSortedAndFilteredData,
  getArrayFragment,
  getFilteredDataByEnteredValues,
} from '../../modules/modules';

import errorsImg from '../../assets/img/Errors.png';

import Advertising from '../folderAdvertising/Advertising';
import Sort from '../folderSort/Sort';
import Filtering from '../folderFiltering/Filtering';
import Search from '../folderSearch/Search';
import MainTitle from '../folderMainTitle/MainTitle';
import ProductCard from '../folderProductCard/ProductCard';
import ProductCardSkeleton from '../folderProductCard/ProductCardSkeleton';
import Pagination from '../folderPagination/Pagination';
import PaginationSkeleton from '../folderPagination/PaginationSkeleton';
import InsteadProduct from '../folderInsteadProduct/InsteadProduct';

const HomePage: React.FC = () => {
  /* используем хук useSelector из библиотеки Redux 
     для получения значений (filteringId, sortId, searchValue) из состояния,
     с помощью селектора sortingAndFilteringSlice */
  const { filteringId, sortId, searchValue } = useSelector(
    (state: RootState) => state.sortingAndFilteringSlice
  );
  const { numberOfCardsPerPage, currentPage } = useSelector(
    (state: RootState) => state.paginationSlice
  );

  const [initialProductData, setInitialProductData] = React.useState<
    ProductType[]
  >([]);
  const [updateProductData, setUpdateProductData] = useState<ProductType[]>([]);
  const [productsCards, setProductsCards] = React.useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [errorOccurred, setErrorOccurred] = React.useState(false);
  // создадим массив для отображения скелетона (он будет заполнен undefined)
  const arrayForSkeleton: undefined[] = [...new Array(numberOfCardsPerPage)];

  /* Используем хук useEffect, чтобы функция fetch() не отправляла постоянно запросы !
  Подробнее:
  Когда компонент первоначально монтируется, `useEffect()` запускает асинхронный вызов `fetch()'
  чтобы получить данные о пиццах из базы данных Firebase. Этот эффект будет запущен только 
  один раз, так как зависимостей нет */
  React.useEffect(() => {
    setIsLoading(true);
    // выполним запрос fetch() к указанному URL-адресу
    fetch('https://mommegan-c835e-default-rtdb.firebaseio.com/shoesData.json')
      // используем метод then() для обработки ответа от сервера
      // если ответ не содержит ошибок (если !response.ok равно false), код выполняется дальше
      .then((response: Response) => {
        // если ответ содержит ошибку, генерируется исключение с сообщением 'Network response was not ok'
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // если ответ успешен, вызывается метод json() для преобразования ответа в формат JSON
        return response.json() as Promise<ProductType[]>;
      })
      // используется метод then() для обработки данных, полученных после преобразования
      .then((data: ProductType[]) => {
        // вызываем функцию `setInitialProductData()` в нееи устанавливаем значение `data` в состояние компонента
        setInitialProductData(data);
      })
      // если происходит ошибка, выводим в консоль и устанавливается значение переменной 'setErrorOccurred(true)'
      .catch((err: Error) => {
        console.log(err, 'err');
        setErrorOccurred(true);
      })
      // независимо, выполнен запрос успешно или произошла ошибка, в блоке finally()
      // устанавливаем значение 'setIsLoading(false)' для завершения процесса загрузки данных
      .finally(() => {
        setIsLoading(false);
      });
    // при переходе на страницу автоматический скролл вверх
    window.scrollTo(0, 0);
  }, []);

  React.useEffect(() => {
    // получим отсортированный и отфильтрованный массив данных
    const productData = getSortedAndFilteredData(
      initialProductData,
      sortId,
      filteringId
    );
    if (typeof productData !== 'string') {
      const productsCardsFragment = getArrayFragment(
        productData,
        currentPage,
        numberOfCardsPerPage
      );
      // запишем в переменную состояния
      setUpdateProductData(productsCardsFragment);
    }

    // установим не все зависимости
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialProductData, numberOfCardsPerPage, currentPage, filteringId]);

  /* используем (useMemo) для создания и кэширования отфильтрованных и отсортированных данных,
  это позволяет избежать повторного вычисления данных при изменении других зависимостей
  поиск товаров и фильтр по категориям */
  React.useMemo(() => {
    // запишем условие
    if (searchValue.trim().length === 0 && filteringId === 0) {
      setProductsCards(updateProductData);
    } else if (searchValue.trim().length === 0 && filteringId !== 0) {
      const productData = getSortedAndFilteredData(
        initialProductData,
        sortId,
        filteringId
      );
      if (typeof productData !== 'string') {
        setProductsCards(productData);
      }
    } else if (searchValue.trim().length !== 0 && filteringId === 0) {
      setProductsCards(
        getFilteredDataByEnteredValues(initialProductData, searchValue)
      );
    } else if (searchValue.trim().length !== 0 && filteringId !== 0) {
      const productData = getSortedAndFilteredData(
        initialProductData,
        sortId,
        filteringId
      );
      if (typeof productData !== 'string') {
        setProductsCards(
          getFilteredDataByEnteredValues(productData, searchValue)
        );
      }
    }
    // установим не все зависимости
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue, filteringId, sortId, updateProductData]);

  return (
    <>
      <Advertising />
      <Search />
      <section className='filtering-and-sorting'>
        <Filtering valueId={filteringId} />
        <Sort
          valueId={sortId}
          updateProductData={updateProductData}
          setUpdateProductData={setUpdateProductData}
        />
      </section>
      {errorOccurred === true ? (
        <>
          <MainTitle
            titleName='Извините, произошла ошибка...'
            styleName={'title-item-error'}
          />
          <InsteadProduct img={errorsImg} />
        </>
      ) : (
        <>
          <MainTitle titleName='Товары' />
          <section className='product-gallery'>
            {isLoading === true
              ? arrayForSkeleton.map((item, index) => {
                  // компонент, заглушки карточек товаров
                  return <ProductCardSkeleton key={index} />;
                })
              : productsCards.map((dataItem: ProductType, index) => {
                  // компонент, карточки товаров
                  return <ProductCard key={dataItem.id} dataItem={dataItem} />;
                })}
          </section>
          <section
            className={
              searchValue.trim().length === 0 && filteringId === 0
                ? 'pagination'
                : `${'pagination'} ${'not-visible-element'}`
            }
          >
            {isLoading === true ? (
              // компонент, заглушка нумерации страниц
              <PaginationSkeleton />
            ) : (
              // компонент, нумерации страниц
              <Pagination initialProductData={initialProductData} />
            )}
          </section>
        </>
      )}
    </>
  );
};

export default HomePage;
