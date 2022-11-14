/**this function generates simple random string that can be used as an Id */
export const generateRandomId = () =>
  Math.trunc(Math.random() * 10 ** 10).toString();
