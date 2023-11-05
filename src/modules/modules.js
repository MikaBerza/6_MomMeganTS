import {
  listOfNamesOfSortingElements,
  listOfFilteringItemNames,
} from '../assets/listsWithNames';

/* Бок с функциями для сортировки и фильтрации_________________________________________________*/
// функция, преобразовать массив элементов в массив с индексами
const convertAnArrayOfElementsToAnArrayWithIndexes = (arr) => {
  /* получим все индексы элементов массива в другом массиве, 
  но исходный массив при этом не изменяется */
  const newArr = arr.map(function (item) {
    return this.indexOf(item);
  }, arr);
  return newArr;
};
// функция, получить отсортированный массив по (алфавиту(title), цене убыванию/возрастанию(price), популярности(rating))
export const getSortedData = (productData, sortingNumber) => {
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
  let sortFunction = null;
  if (sortingNumber === alphabet) {
    // Для правильной сортировки слов по русскому алфавиту используем метод localeCompare()
    // с использованием правил локали для англ.яз "en"
    sortFunction = (a, b) => a['title'].localeCompare(b['title'], 'en');
  } else if (sortingNumber === priceAscending) {
    // Для сортировки по числовым свойствам (price)
    sortFunction = (a, b) => a['price'] - b['price'];
  } else if (sortingNumber === priceDescending) {
    // Для сортировки по числовым свойствам (price)
    sortFunction = (a, b) => b['price'] - a['price'];
  } else if (sortingNumber === rating) {
    // Для сортировки по числовым свойствам (rating)
    sortFunction = (a, b) => b['rating'] - a['rating'];
  }
  // Сортируем и возвращаем отсортированный массив
  return copyDataArray.sort(sortFunction);
};

// функция, получить отфильтрованный массив по (категориям(category))
export const getFilteredData = (productData, categoryNumber) => {
  // Отфильтруем массив по категориям (categoryNumber) и вернем его
  return productData.filter((item) => item.category === categoryNumber);
};

// функция, получить отсортированный и отфильтрованный массив
export const getSortedAndFilteredData = (
  productData,
  sortingNumber,
  categoryNumber
) => {
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
export const getFilteredDataByEnteredValues = (arrData, inputValue) => {
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
export const getAnArrayWithPageNumbers = (arrData, numberOfProducts) => {
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
  arrData,
  currentIndex,
  numberOfElementsPerPage
) => {
  const begin = currentIndex * numberOfElementsPerPage;
  const end = begin + numberOfElementsPerPage;
  return arrData.slice(begin, end);
};

// функция проверяет длину строки
export const checkLengthOfTheString = (str) => {
  if (str.trim().length === 0) {
    return true;
  } else if (str.trim().length > 0) {
    return false;
  }
};

/* Бок с функциями для работы c localStorage____________________________________________________*/
// функция проверяет данные из localStorage на null (отсутствие значения)
export const checkLocalStorageForNull = () => {
  // получим строку с данными из localStorage
  const dataFromLocalStorage = window.localStorage.getItem('keyDataset');
  if (dataFromLocalStorage === null) {
    return null;
  }
  return true;
};

// функция записывает данные в localStorage
export const writeToLocalStorage = (dataset) => {
  // преобразует значение JS в строку JSON
  const strDataset = JSON.stringify(dataset);
  // добавляем набор данных в localStorage
  window.localStorage.setItem('keyDataset', strDataset);
};

// функция возвращает объект с данными из localStorage
export const returnAnObjectWithDataFromLocalStorage = () => {
  // получим строку с данными из localStorage
  const dataFromLocalStorage = window.localStorage.getItem('keyDataset');
  // преобразуем строку JSON из localStorage в значение JS
  const dataset = JSON.parse(dataFromLocalStorage);
  return dataset;
};
/*______________________________________________________________________________________________*/
