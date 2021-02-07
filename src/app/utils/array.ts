export const pickRandom = <T>(arr: T[]) => {
  return arr[
    Math.floor(Math.random() * arr.length)
  ];
};
