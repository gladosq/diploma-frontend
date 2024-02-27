import s from './ModerateArticle.module.scss';
import Editor from '../../libs/Editor/Editor.tsx';
import Button from '../UI/Button/Button.tsx';

export default function ModerateArticle() {
  return (
    <div className={s.wrapper}>
      <h1>Редактирование статьи</h1>
      <div className={s.rte}>
        <Editor/>
      </div>
      <Button>Сохранить</Button>
    </div>
  );
}
