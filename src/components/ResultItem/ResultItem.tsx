import s from './ResultItem.module.scss';

export default function ResultItem() {
  return (
    <div className={s.wrapper}>
      <div className={s.textContainer}>
        <h2>Встроенные объекты и функции</h2>
        <p>Контекст функции — некоторая противоположность областям видимости. Ключевая разница в том, что область видимости самой функции и доступные ей родительские области видимости...</p>
      </div>
      <div className={s.labelContainer}>
        <div className={s.inner}>
          Верных ответов:
          <span className={s.correctCaption}>8</span>
        </div>
        <div className={s.inner}>
          Ошибок:
          <span className={s.wrongCaption}>2</span>
        </div>
        <div className={s.date}>21.04.24</div>
      </div>
    </div>
  );
}