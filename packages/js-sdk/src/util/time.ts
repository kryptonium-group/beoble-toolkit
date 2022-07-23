export const isDateOver = (utcTime: string) => {
  const givenDate = new Date(utcTime);
  const now = new Date();
  return givenDate < now;
};
