import s from './ModuleArticle.module.scss';

export default function ModuleArticle() {
  return (
    <div className={s.wrapper}>
      <h1>Материал</h1>
      <div className={s.article}>
        article
      </div>
    </div>
  );
}
