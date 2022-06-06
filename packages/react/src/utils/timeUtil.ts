import dateFormat from 'dateformat';

export const convertTimestampTo = (timestamp: number | string) => {
  const date = new Date(timestamp);
  const today = new Date();

  if (today.getDate() === date.getDate()) return dateFormat(date, ' h:MM TT');
  else if (today.getFullYear() === date.getFullYear())
    return dateFormat(date, 'mmm d');
  else return dateFormat(date, 'mmm d, yyyy');
};
