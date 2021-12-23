export const generateRandomNumber = (min = 0, max = 1) =>
  min + Math.round(Math.random() * max)
