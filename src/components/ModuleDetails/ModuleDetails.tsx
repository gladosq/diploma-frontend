import s from './ModuleDetails.module.scss';
import Button from '../UI/Button/Button.tsx';
import {useNavigate} from 'react-router-dom';

export default function ModuleDetails() {
  const history = useNavigate();

  // TODO: хардкод
  const isModerate = true;

  return (
    <div className={s.wrapper}>
      {isModerate && (
        <div className={s.moderateWrapper}>
          <h2>Новый модуль</h2>
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
          1. Контекст функций и проблема потери окружения<br/>
          2. Деструктуризация<br/>
          3. Как сообщения попадают в консоль<br/>
        </div>
        <Button
          className={s.button}
          onClick={() => {
            if (!isModerate) {
              history('/module/1/article');
            } else {
              history('/moderate/1/article');
            }
          }}
        >
          {isModerate ? 'Редактировать статью' : 'Изучить материал'}
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
            if (!isModerate) {
              history('/module/1/test');
            } else {
              history('/moderate/1/test');
            }
          }}
        >
          {isModerate ? 'Редактировать тест' : 'Пройти тестирование'}
        </Button>
      </div>
    </div>
  );
}
