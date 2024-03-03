import s from './ResultItem.module.scss';
import dayjs from 'dayjs';

type ResultItemProps = {
  title: string;
  description: string;
  createdAt: string;
  correct: number;
  wrong: number;
}

export default function ResultItem({title, description, createdAt, correct, wrong}: ResultItemProps) {
  return (
    <div className={s.wrapper}>
      <div className={s.textContainer}>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className={s.labelContainer}>
        <div className={s.inner}>
          Верных ответов:
          <span className={s.correctCaption}>{correct}</span>
        </div>
        <div className={s.inner}>
          Ошибок:
          <span className={s.wrongCaption}>{wrong}</span>
        </div>
        <div className={s.date}>{dayjs(createdAt).format('DD.MM.YY HH:mm')}</div>
      </div>
    </div>
  );
}
