import {DifficultyEnum, JobTitleEnum} from '../const/enum.ts';

export const difficultyMapper: Record<DifficultyEnum, string> = {
  [DifficultyEnum.Easy]: 'Легкий',
  [DifficultyEnum.Medium]: 'Средний',
  [DifficultyEnum.Hard]: 'Сложный',
};

export const jobMapper: Record<JobTitleEnum, string> = {
  [JobTitleEnum.Moderator]: 'Модератор',
  [JobTitleEnum.Frontend]: 'Фронтенд-разработчик',
  [JobTitleEnum.Backend]: 'Бэкенд-разработчик',
  [JobTitleEnum.DevOps]: 'DevOps',
};

export enum RoutesEnum {
  MainPage = '',
  Profile = 'profile',
  Tests = 'tests',
  Moderate = 'moderate',
  Article = 'article',
}

export const breadcrumbsMapper: Record<RoutesEnum, string> = {
  [RoutesEnum.MainPage]: 'Главная',
  [RoutesEnum.Profile]: 'Профиль',
  [RoutesEnum.Moderate]: 'Модерация',
  [RoutesEnum.Tests]: 'Мои тесты',
  [RoutesEnum.Article]: 'Материал'
};

export const routesMapper: Record<RoutesEnum, string | undefined> = {
  [RoutesEnum.MainPage]: '/',
  [RoutesEnum.Profile]: '/profile',
  [RoutesEnum.Moderate]: '/moderate',
  [RoutesEnum.Tests]: '/profile/tests',
  [RoutesEnum.Article]: undefined
};
