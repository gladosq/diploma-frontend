import s from './Profile.module.scss';
import CompleteIcon from '../UI/Icons/CompleteIcon.tsx';
import Button from '../UI/Button/Button.tsx';
import UsersList from '../UsersList/UsersList.tsx';

export default function Profile() {
  return (
    <div className={s.wrapper}>
      <UsersList/>
      <div className={s.container}>
        <div className={s.innerContainer}>
          <h2 className={s.name}>Шишкин Никита Юрьевич</h2>
          <div className={s.status}>
            <div className={s.statusInner}>
              Чтение материала
              <CompleteIcon/>
            </div>
            <div className={s.statusInner}>
              Прохождение теста
              <CompleteIcon/>
            </div>
          </div>
        </div>
        <div className={s.info}>
          <span className={s.post}>Администратор</span>
        </div>
      </div>
      <div className={s.container}>
        <div className={s.innerContainer}>
          <h2 className={s.subtitle}>Персональная ставка</h2>
          <div className={s.buttonContainer}>
            <Button>
              Пройти экзамен
            </Button>
          </div>
        </div>
        <p className={s.rate}>0.78</p>
        <p className={s.caption}>Для повышения персональной ставки нужно пройти экзамен</p>
      </div>
    </div>
  );
}
