import { useDispatch } from 'react-redux';
import { setFilteringId } from '../../redux/slices/sortingAndFilteringSlice';

import style from './Filtering.module.css';
import { listOfFilteringItemNames } from '../../assets/listsWithNames';
import { FilteringPropsType } from '../../@types/customType';

const Filtering: React.FC<FilteringPropsType> = ({ valueId }) => {
  const dispatch = useDispatch();

  const onClickFiltering = (index: number) => {
    dispatch(setFilteringId(index));
  };

  return (
    <div className={style['container']}>
      <ul className={style['list']}>
        {listOfFilteringItemNames.map((nameItem, index) => {
          return (
            <li
              key={index}
              onClick={() => onClickFiltering(index)}
              className={`${valueId === index ? style['active'] : ''} ${
                style['list-item']
              }`}
            >
              {nameItem}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Filtering;
