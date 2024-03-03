import s from './TestsList.module.scss';
import ResultItem from '../ResultItem/ResultItem.tsx';
import {useCookies} from 'react-cookie';
import {useAllResults} from '../../api/results.ts';
import {jwtDecode} from 'jwt-decode';
import {ModulesResponseType} from '../../api/modules.ts';

type ResultType = {
  id: string;
  module: ModulesResponseType;
  result: {
    userAnswer: string;
    correctAnswer: string;
  }[];
  createdAt: string;
}

export default function TestsList() {
  const [cookies] = useCookies(['auth-data']);
  const userId = jwtDecode(cookies['auth-data']);

  const {data, isSuccess} = useAllResults({id: userId.sub, token: cookies['auth-data']});

  return (
    <div className={s.wrapper}>
      <h2 className={s.name}>Пройденные тесты</h2>
      <div className={s.results}>
        {isSuccess && data.map((item: ResultType) => {
          const formattedResults = item.result.map((result) => {
            return result.userAnswer === result.correctAnswer;
          });

          return (
            <ResultItem
              title={item.module.title}
              description={item.module.description}
              createdAt={item.createdAt}
              correct={formattedResults.filter((item) => item).length}
              wrong={formattedResults.filter((item) => !item).length}
            />
          );
        })}
      </div>
    </div>
  );
}
