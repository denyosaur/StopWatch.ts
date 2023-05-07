export const converToString = (time: number): string => {
  const date: Date = new Date(0);
  date.setSeconds(time);
  return date.toISOString().substring(11, 19);
};
