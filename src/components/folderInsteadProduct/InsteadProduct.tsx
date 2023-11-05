import { InsteadProductPropsType } from '../../@types/customType';
import style from './insteadProduct.module.css';

const InsteadProduct: React.FC<InsteadProductPropsType> = ({ img }) => {
  return (
    <div className={style['img']}>
      <img className={style['img-item']} src={img} alt='img' />
    </div>
  );
};

export default InsteadProduct;
