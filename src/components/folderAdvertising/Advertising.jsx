import React from 'react';

import style from '../folderAdvertising/advertising.module.css';

import megaSale50 from '../../assets/img/advertising/block_1/mega_sale_50.png';
import megaSale80 from '../../assets/img/advertising/block_1/mega_sale_80.png';
import peopleLeft1 from '../../assets/img/advertising/block_2_1/people_2_1.png';
import peopleLeft2 from '../../assets/img/advertising/block_2_1/people_2_1_1.png';
import peopleRight1 from '../../assets/img/advertising/block_2_2/people_2_2.png';
import peopleRight2 from '../../assets/img/advertising/block_2_2/people_2_2_1.png';

function Advertising() {
  const [currentIndex1, setCurrentIndex1] = React.useState(0);
  const [currentIndex2, setCurrentIndex2] = React.useState(0);
  const [currentIndex3, setCurrentIndex3] = React.useState(0);
  // массив путей к изображениям
  const arrayPathsToImgMegaSale = [megaSale80, megaSale50];
  const arrayPathsPeopleLeft = [peopleLeft1, peopleLeft2];
  const arrayPathsPeopleRight = [peopleRight1, peopleRight2];

  React.useEffect(() => {
    const interval_1 = setInterval(() => {
      setCurrentIndex1((prevIndex) =>
        prevIndex === arrayPathsToImgMegaSale.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    // функция интервал задержки, она нужна для запуска других интервалов с задержкой
    const delayedInterval = (
      arrayPaths,
      timeoutDelayValue,
      valueUpdateFunction
    ) => {
      setTimeout(() => {
        setInterval(() => {
          valueUpdateFunction((prevIndex) =>
            prevIndex === arrayPaths.length - 1 ? 0 : prevIndex + 1
          );
        }, 4000);
      }, timeoutDelayValue);
    };

    // Вызываем функцию delayedInterval
    delayedInterval(arrayPathsPeopleLeft, 1000, setCurrentIndex2);
    delayedInterval(arrayPathsPeopleRight, 2000, setCurrentIndex3);

    return () => {
      clearInterval(interval_1);
      clearTimeout(delayedInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={style['wrapper']}>
      <img
        className={`${style['advertising-photos-img1']}`}
        src={arrayPathsToImgMegaSale[currentIndex1]}
        alt='imgMegaSale'
      />
      <img
        className={style['advertising-photos-img2']}
        src={arrayPathsPeopleLeft[currentIndex2]}
        alt='img'
      />
      <img
        className={style['advertising-photos-img2']}
        src={arrayPathsPeopleRight[currentIndex3]}
        alt='img'
      />
    </div>
  );
}

export default Advertising;
