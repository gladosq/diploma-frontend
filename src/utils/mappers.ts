import {DifficultyEnum, JobTitleEnum} from '../const/enum.ts';

export const difficultyMapper: Record<DifficultyEnum, string> = {
  [DifficultyEnum.Easy]: 'Легкая',
  [DifficultyEnum.Medium]: 'Средняя',
  [DifficultyEnum.Hard]: 'Высокая',
};

export const jobMapper: Record<JobTitleEnum, string> = {
  [JobTitleEnum.Moderator]: 'Модератор',
  [JobTitleEnum.Frontend]: 'Фронтенд-разработчик',
  [JobTitleEnum.Backend]: 'Бэкенд-разработчик',
  [JobTitleEnum.DevOps]: 'DevOps',
};
