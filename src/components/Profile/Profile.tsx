import s from './Profile.module.scss';
import CompleteIcon from '../UI/Icons/CompleteIcon.tsx';
import Button from '../UI/Button/Button.tsx';
import {JobTitleEnum} from '../../const/enum.ts';
import {jobMapper} from '../../utils/mappers.ts';
import {useQuery} from '@tanstack/react-query';
import {ProfileResponseType} from '../../api/authentication.ts';

export default function Profile() {
  const {data: dataProfile} = useQuery<ProfileResponseType>({ queryKey: ['my-profile']});

  console.log('dataProfile:', dataProfile);

  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <div className={s.innerContainer}>
          <h2 className={s.name}>{dataProfile?.name}</h2>
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
          <span className={s.post}>{jobMapper[dataProfile?.jobTitle as JobTitleEnum]}</span>
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
        <p className={s.rate}>{dataProfile?.grade || <span className={s.emptyGrade}>не указано</span>}</p>
        <p className={s.caption}>Для повышения персональной ставки нужно пройти экзамен</p>
      </div>
    </div>
  );
}
