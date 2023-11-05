import { MainTitleProps } from '../../@types/customType';
import style from './MainTitle.module.css';

const MainTitle: React.FC<MainTitleProps> = ({ titleName, styleName }) => {
  return (
    <section className={style['title']}>
      <h1
        className={
          styleName === undefined
            ? `${style['title-item']}`
            : `${style['title-item']} ${style[styleName]}`
        }
      >
        {titleName}
      </h1>
    </section>
  );
};

export default MainTitle;
