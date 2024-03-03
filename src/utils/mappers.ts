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
  Module = 'module',
  Moderate = 'moderate',
}

export const breadcrumbsMapper: Record<RoutesEnum, string> = {
  [RoutesEnum.MainPage]: 'Главная',
  [RoutesEnum.Module]: 'Модули',
  [RoutesEnum.Profile]: 'Профиль',
  [RoutesEnum.Moderate]: 'Модерация',
  [RoutesEnum.Tests]: 'Мои тесты'
};

export const routesMapper: Record<RoutesEnum, string | undefined> = {
  [RoutesEnum.MainPage]: '/',
  [RoutesEnum.Module]: undefined,
  [RoutesEnum.Profile]: '/profile',
  [RoutesEnum.Moderate]: '/moderate',
  [RoutesEnum.Tests]: '/profile/tests'
};
