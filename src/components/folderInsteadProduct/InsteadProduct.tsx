import style from './insteadProduct.module.css';

type InsteadProductProps = {
  img: string;
};

const InsteadProduct: React.FC<InsteadProductProps> = ({ img }) => {
  return (
    <div className={style['img']}>
      <img className={style['img-item']} src={img} alt='img' />
    </div>
  );
};

export default InsteadProduct;
