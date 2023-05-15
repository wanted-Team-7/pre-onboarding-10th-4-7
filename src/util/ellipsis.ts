export const ellipsis = (str: string, limit: number) => {
  if (str.length > limit) return str.substr(0, limit - 2) + '...';
  else return str;
};
