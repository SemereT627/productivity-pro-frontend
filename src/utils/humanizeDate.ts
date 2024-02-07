export const humanizeDateUTCWithoutTime = (date: string) => {
  return new Date(date).toUTCString().split(" ").slice(0, 4).join(" ");
};

export const humanizeDateUTCWithTime = (date: string) => {
  return new Date(date).toUTCString();
};
