import s from './TestsList.module.scss';
import ResultItem from '../ResultItem/ResultItem.tsx';

export default function TestsList() {
  return (
    <div className={s.wrapper}>
      <h2 className={s.name}>Пройденные тесты</h2>
      <ResultItem/>
    </div>
  );
}
