import s from './MainAppLayout.module.scss';
import {Outlet} from 'react-router-dom';
import Header from '../Header/Header.tsx';

export default function MainAppLayout() {

  return (
    <div className={s.wrapper}>
      <Header/>
      <div className={s.contentWrapper}>
        <Outlet/>
      </div>
      <div style={{marginTop: 'auto'}}>footer</div>
    </div>
  );
}
