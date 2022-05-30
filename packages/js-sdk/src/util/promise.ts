export const until = (condition: () => boolean) => {
  const poll = (resolve: (value?: any) => void) => {
    if (condition()) resolve();
    else setTimeout(() => poll(resolve), 400);
  };
  return new Promise(poll);
};
