import {
  listOfNamesOfSortingElements,
  listOfFilteringItemNames,
} from '../assets/listsWithNames';

type LocalStorageType = {
  dateValue: Date;
  searchValue: string;
  filteringValue: number;
  sortValue: number;
  currentPageValue: number;
  productCounterValue: number;
  priceCounterValue: number;
  cartDataValue: [];
};

type ProductsType = {
  id: number;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
};

/* Бок с функциями для сортировки и фильтрации_________________________________________________*/
// функция, преобразовать массив элементов в массив с индексами
const convertAnArrayOfElementsToAnArrayWithIndexes = (
  arr: string[]
): number[] => {
  /* получим все индексы элементов массива в другом массиве, 
  но исходный массив при этом не изменяется */
  const newArr = arr.map((item) => arr.indexOf(item));
  return newArr;
};

// функция, получить отсортированный массив по (алфавиту(title), цене убыванию/возрастанию(price), популярности(rating))
export const getSortedData = (
  productData: ProductsType[],
  sortingNumber: number
): ProductsType[] => {
  // Создаем копию исходного массива
  const copyDataArray = [...productData];

  // запишем в константы индексы элементов из списка сортировки
  const rating = listOfNamesOfSortingElements.indexOf('популярности');
  const priceDescending = listOfNamesOfSortingElements.indexOf('убыванию цены');
  const priceAscending =
    listOfNamesOfSortingElements.indexOf('возрастанию цены');
  const alphabet = listOfNamesOfSortingElements.indexOf('алфавиту');

  // Выбираем метод сортировки в зависимости от sortingNumber, а пока
  // объявим переменную и присвоили ей значение null
  let sortFunction: ((a: ProductsType, b: ProductsType) => number) | undefined;
  if (sortingNumber === alphabet) {
    // Для правильной сортировки слов по русскому алфавиту используем метод localeCompare()
    // с использованием правил локали для англ.яз "en"
    sortFunction = (a: ProductsType, b: ProductsType) =>
      a['title'].localeCompare(b['title'], 'en');
  } else if (sortingNumber === priceAscending) {
    // Для сортировки по числовым свойствам (price)
    sortFunction = (a: ProductsType, b: ProductsType) =>
      a['price'] - b['price'];
  } else if (sortingNumber === priceDescending) {
    // Для сортировки по числовым свойствам (price)
    sortFunction = (a: ProductsType, b: ProductsType) =>
      b['price'] - a['price'];
  } else if (sortingNumber === rating) {
    // Для сортировки по числовым свойствам (rating)
    sortFunction = (a: ProductsType, b: ProductsType) =>
      b['rating'] - a['rating'];
  }
  // Сортируем и возвращаем отсортированный массив
  // return copyDataArray.sort(sortFunction);
  return sortFunction ? copyDataArray.sort(sortFunction) : copyDataArray;
};

// функция, получить отфильтрованный массив по (категориям(category))
export const getFilteredData = (
  productData: ProductsType[],
  categoryNumber: number
): ProductsType[] => {
  // Отфильтруем массив по категориям (categoryNumber) и вернем его
  return productData.filter((item) => item.category === categoryNumber);
};

// функция, получить отсортированный и отфильтрованный массив
export const getSortedAndFilteredData = (
  productData: ProductsType[],
  sortingNumber: number,
  categoryNumber: number
): ProductsType[] | string => {
  // допустимые свойства сортировки запишем в константу
  const validSortProperties = convertAnArrayOfElementsToAnArrayWithIndexes(
    listOfNamesOfSortingElements
  );
  // допустимые свойства фильтрации запишем в константу
  const validFilterProperties = convertAnArrayOfElementsToAnArrayWithIndexes(
    listOfFilteringItemNames
  );
  // Проверяем, является ли sortingNumber и categoryNumber допустимым свойством для сортировки и фильтрации
  if (!validSortProperties.includes(sortingNumber)) {
    return 'Указан неверный параметр функции sortingNumber (Invalid function parameter sortingNumber specified)';
  } else if (!validFilterProperties.includes(categoryNumber)) {
    return 'Указан неверный параметр функции categoryNumber (Invalid function parameter categoryNumber specified)';
  }

  // Отсортировать массив по выбранному свойству (sortingNumber)
  const sortedArray = getSortedData(productData, sortingNumber);
  // если выбрана категория "Все", то возвращаем отсортированный массив
  if (categoryNumber === 0) {
    return sortedArray;
  }
  // Фильтровать отсортированный массив по категории (categoryNumber)
  const filteredAndSortedArray = getFilteredData(sortedArray, categoryNumber);
  // вернем отфильтрованный по категориям и отсортированный массив массив
  return filteredAndSortedArray;
};

// функция, получить отфильтрованные данные по введенным значениям в input
export const getFilteredDataByEnteredValues = (
  arrData: ProductsType[],
  inputValue: string
): ProductsType[] => {
  const newArr = arrData.filter((obj) => {
    if (obj.title.toUpperCase().includes(inputValue.toUpperCase())) {
      return true;
    } else {
      return false;
    }
  });
  return newArr;
};
/*______________________________________________________________________________________________*/

// функция, получить массив с номерами страниц
export const getAnArrayWithPageNumbers = (
  arrData: ProductsType[],
  numberOfProducts: number
): number[] => {
  let newArr = [];
  // количество страниц
  const numberOfPages = Math.ceil(arrData.length / numberOfProducts);
  for (let i = 1; i < numberOfPages + 1; i++) {
    newArr.push(i);
  }
  return newArr;
};

// функция, получить фрагмент массива
export const getArrayFragment = (
  arrData: ProductsType[],
  currentIndex: number,
  numberOfElementsPerPage: number
): ProductsType[] => {
  const begin = currentIndex * numberOfElementsPerPage;
  const end = begin + numberOfElementsPerPage;
  return arrData.slice(begin, end);
};

// функция проверяет длину строки
export const checkLengthOfTheString = (str: string): boolean => {
  if (str.trim().length === 0) {
    return true;
  } else {
    return false;
  }
};

/* Бок с функциями для работы c localStorage____________________________________________________*/
// функция проверяет данные из localStorage на null (отсутствие значения)
export const checkLocalStorageForNull = (): true | null => {
  // получим строку с данными из localStorage
  const dataFromLocalStorage = window.localStorage.getItem('keyDataset');
  if (dataFromLocalStorage === null) {
    return null;
  }
  return true;
};

// функция записывает данные в localStorage
export const writeToLocalStorage = (dataset: LocalStorageType): void => {
  // преобразует значение JS в строку JSON
  const strDataset: string = JSON.stringify(dataset);
  // добавляем набор данных в localStorage
  window.localStorage.setItem('keyDataset', strDataset);
};

// функция возвращает объект с данными из localStorage
export const returnAnObjectWithDataFromLocalStorage =
  (): LocalStorageType | null => {
    // получим строку с данными из localStorage
    const dataFromLocalStorage = window.localStorage.getItem('keyDataset');
    if (dataFromLocalStorage === null) {
      return null;
    }
    // преобразуем строку JSON из localStorage в значение JS
    const dataset = JSON.parse(dataFromLocalStorage);
    return dataset;
  };
/*______________________________________________________________________________________________*/
