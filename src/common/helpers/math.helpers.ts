// based off https://stackoverflow.com/a/7228322/12222861
export const getRandomNumFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
