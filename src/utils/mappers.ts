import {DifficultyType} from '../const/enum.ts';

export const difficultyMapper: Record<DifficultyType, string> = {
  [DifficultyType.Easy]: 'Легкая',
  [DifficultyType.Medium]: 'Средняя',
  [DifficultyType.Hard]: 'Высокая',
};
