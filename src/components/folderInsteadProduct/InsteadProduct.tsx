import { InsteadProductProps } from '../../@types/customType';
import style from './insteadProduct.module.css';

const InsteadProduct: React.FC<InsteadProductProps> = ({ img }) => {
  return (
    <div className={style['img']}>
      <img className={style['img-item']} src={img} alt='img' />
    </div>
  );
};

export default InsteadProduct;
