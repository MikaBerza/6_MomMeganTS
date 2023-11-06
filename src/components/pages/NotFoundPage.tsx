import React from 'react';
import NotFoundBlock from '../folderNotFound/NotFoundBlock';

const NotFoundPage: React.FC = () => {
  return (
    <section className={'not-found'}>
      <NotFoundBlock
        title={'Ничего не найдено'}
        description={'К сожалению данные отсутствуют'}
      />
    </section>
  );
};

export default NotFoundPage;
