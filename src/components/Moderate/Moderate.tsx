import s from './Moderate.module.scss';
import ModulesList from '../ModulesList/ModulesList.tsx';
import UsersList from '../UsersList/UsersList.tsx';

export default function Moderate() {
  return (
    <div className={s.wrapper}>
      <UsersList/>
      <ModulesList/>

      {/*<div className={s.container}>*/}
      {/*  <h1>Список участников</h1>*/}
      {/*</div>*/}
    </div>
  );
}
