/**
 * @example getNumericWord(5, ['символ', 'символа', 'символов'])
 */
export const getNumericWord = (value: number, words: string[]): string => {
  const parsedValue = Math.abs(value) % 100;

  const num = parsedValue % 10;
  if (parsedValue > 10 && parsedValue < 20) return words[2];
  if (num > 1 && num < 5) return words[1];
  if (num == 1) return words[0];

  return words[2];
};
