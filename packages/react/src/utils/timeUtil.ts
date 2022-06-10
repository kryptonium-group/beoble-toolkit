import dateFormat from 'dateformat';

export const convertTime = (timestamp: number) => {
  const date = new Date(+timestamp);
  const today = new Date();

  if (today.getMinutes() === date.getMinutes()) return 'Just now';
  else if (today.getDate() === date.getDate())
    return dateFormat(date, ' h:MM TT');
  else if (today.getFullYear() === date.getFullYear())
    return dateFormat(date, 'mmm d');
  else return dateFormat(date, 'mmm d, yyyy');
};

/**
 *
 * @param timestamp A
 * @param timestampToCompare B
 * @returns true only if all date info to minute are same.
 */
export const isMinEqual = (timestamp: number, timestampToCompare: number) => {
  const date = new Date(timestamp);
  const dateToCompare = new Date(timestampToCompare);

  if (date.getFullYear() === dateToCompare.getFullYear()) {
    if (date.getMonth() === dateToCompare.getMonth()) {
      if (date.getDate() === dateToCompare.getDate()) {
        if (date.getHours() === dateToCompare.getHours())
          return date.getMinutes() === dateToCompare.getMinutes();
      }
    }
  }
  return false;
};
