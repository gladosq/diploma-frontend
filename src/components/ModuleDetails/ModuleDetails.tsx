import s from './ModuleDetails.module.scss';
import Button from '../UI/Button/Button.tsx';
import {useNavigate, useParams} from 'react-router-dom';
import {useModule} from '../../api/modules.ts';
import {useCookies} from 'react-cookie';
import {RoleEnum} from '../../const/enum.ts';
import {useMemo} from 'react';
import {useQuery} from '@tanstack/react-query';

export default function ModuleDetails() {
  const history = useNavigate();
  const [cookies] = useCookies(['auth-data']);
  const {id} = useParams();

  const {data: dataProfile, isSuccess} = useQuery<{role: string}>({ queryKey: ['my-profile']});
  const {data} = useModule({token: cookies['auth-data'], id: id});

  const isModerator = useMemo(() => dataProfile?.role === RoleEnum.Moderator, [isSuccess]);

  return (
    <div className={s.wrapper}>
      {dataProfile?.role === RoleEnum.Moderator && (
        <div className={s.moderateWrapper}>
          <h2>{data?.title}</h2>
          <span className={s.status}>Снято с публикации</span>
          <div className={s.moderateInner}>
            <Button className={s.publishButton}>
              Опубликовать
            </Button>
            <Button>
              Редактировать
            </Button>
            <div className={s.info}>
              <p>Создано: 21.02.24</p>
              <p>Отредактировано: 21.02.24</p>
            </div>
          </div>
        </div>
      )}
      <div className={s.container}>
        <h2 className={s.title}>Материал</h2>
        <div className={s.content}>
          {!!data?.article.length ? data.article : (
            <span className={s.emptyData}>не заполнено</span>
          )}
        </div>
        <Button
          className={s.button}
          onClick={() => {
            if (!isModerator) {
              history(`/module/${id}/article`);
            } else {
              history('/moderate/1/article');
            }
          }}
        >
          {isModerator ? 'Редактировать статью' : 'Изучить материал'}
        </Button>
      </div>
      <div className={s.container}>
        <h2 className={s.title}>Тестирование</h2>
        <div className={s.content}>
          Сложность теста: средняя<br/>
          Вопросов: 12<br/>
        </div>
        <Button
          className={s.button}
          onClick={() => {
            if (!isModerator) {
              history(`/module/${id}/test`);
            } else {
              history(`/moderate/${id}/test`);
            }
          }}
        >
          {isModerator ? 'Редактировать тест' : 'Пройти тестирование'}
        </Button>
      </div>
    </div>
  );
}
