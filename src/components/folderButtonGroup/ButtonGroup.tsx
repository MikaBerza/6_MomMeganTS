import { Link } from 'react-router-dom';

import style from './ButtonGroup.module.css';
import Button from '../folderButton/Button';
import { ButtonGroupPropsType } from '../../@types/customType';

const ButtonGroup: React.FC<ButtonGroupPropsType> = ({ styleName }) => {
  if (styleName === undefined) {
    styleName = '';
  }

  return (
    <div className={`${style['wrapper']} ${style[styleName]}`}>
      <Link to='/6_MomMeganTS' className={style['link']}>
        <Button
          nameBtn={'Вернуться назад'}
          nameStyle={['button_v5', 'button-icon_v4', 'button-name_v1']}
        />
      </Link>
      <Button
        nameBtn={'Оплатить сейчас'}
        nameStyle={['button_v5', 'button-icon_v5', 'button-name_v1']}
      />
    </div>
  );
};

export default ButtonGroup;
