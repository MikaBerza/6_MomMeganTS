import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setCurrentPage } from './redux/slices/paginationSlice';
import {
  setFilteringId,
  setSortId,
  setSearchValue,
} from './redux/slices/sortingAndFilteringSlice';
import {
  setProductCounter,
  setPriceCounter,
  setCartData,
} from './redux/slices/cartOfProductsSlice';

import { Routes, Route } from 'react-router-dom';

import Header from './components/folderHeader/Header';
import HomePage from './components/pages/HomePage';
import CartPage from './components/pages/CartPage';
import NotFoundPage from './components/pages/NotFoundPage';
import Footer from './components/folderFooter/Footer';

import {
  checkLocalStorageForNull,
  writeToLocalStorage,
  returnAnObjectWithDataFromLocalStorage,
} from './modules/modules';

import './App.css';

function App() {
  //____Логика сохранения и получение данных при перезагрузке страницы
  const dispatch = useDispatch();
  /* используем хук useSelector из библиотеки Redux 
     для получения значений (filteringId, sortId, searchValue) из состояния,
     с помощью селектора sortingAndFilteringSlice */
  // ПОТОМ УБРАТЬ state: any!!!!!!!!____________________
  const { filteringId, sortId, searchValue } = useSelector(
    (state: any) => state.sortingAndFilteringSlice
  );
  // ПОТОМ УБРАТЬ state: any!!!!!!!!____________________
  const { currentPage } = useSelector((state: any) => state.paginationSlice);
  // ПОТОМ УБРАТЬ state: any!!!!!!!!____________________
  const { productCounter, priceCounter, cartData } = useSelector(
    (state: any) => state.cartOfProductsSlice
  );

  React.useEffect(() => {
    // После перезагрузки страницы установим данные из localStorage
    if (checkLocalStorageForNull() !== null) {
      // запишем возвращенный объект с данными из localStorage в константу
      const dataset = returnAnObjectWithDataFromLocalStorage();
      // установим значения из localStorage
      dispatch(setFilteringId(dataset.filteringValue));
      dispatch(setSortId(dataset.sortValue));
      dispatch(setSearchValue(dataset.searchValue));
      dispatch(setCurrentPage(dataset.currentPageValue));
      dispatch(setProductCounter(dataset.productCounterValue));
      dispatch(setPriceCounter(dataset.priceCounterValue));
      dispatch(setCartData(dataset.cartDataValue));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (checkLocalStorageForNull() === null) {
      // формируем объект с данными сеанса
      const sessionData = {
        dateValue: new Date(),
        searchValue: searchValue,
        filteringValue: filteringId,
        sortValue: sortId,
        currentPageValue: currentPage,
        productCounterValue: productCounter,
        priceCounterValue: priceCounter,
        cartDataValue: cartData,
      };
      // вызываем функцию для записи данных в localStorage
      writeToLocalStorage(sessionData);
      // если localStorage не равен null
    } else if (checkLocalStorageForNull() !== null) {
      // функция запустить перед перезагрузкой
      const runBeforeReboot = () => {
        // формируем новый объект с данными сеанса
        const sessionData = {
          dateValue: new Date(),
          searchValue: searchValue,
          filteringValue: filteringId,
          sortValue: sortId,
          currentPageValue: currentPage,
          productCounterValue: productCounter,
          priceCounterValue: priceCounter,
          cartDataValue: cartData,
        };
        // вызываем функцию для записи данных в localStorage
        writeToLocalStorage(sessionData);
      };
      // (beforeunload) событие, которое возникает веб-браузере перед тем, как пользователь покинет страниц
      window.addEventListener('beforeunload', runBeforeReboot);
      /* удаляем обработчик события при размонтировании компонента
         с помощью возврата функции из функции (useEffect) */
      return () => {
        window.removeEventListener('beforeunload', runBeforeReboot);
      };
    }
  }, [
    searchValue,
    filteringId,
    sortId,
    currentPage,
    productCounter,
    priceCounter,
    cartData,
  ]);

  return (
    <>
      <div className='wrapper'>
        <Header />
        <Routes>
          <Route path='/6_MomMegan' element={<HomePage />} />
          <Route path='/6_MomMegan/CartPage' element={<CartPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
