export const formatClockTime = (date: Date, locale: string = 'pt-br') => {
  return date.toLocaleTimeString(locale);
};
