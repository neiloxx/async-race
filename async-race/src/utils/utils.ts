import Button from '../components/elements/button/button';

const models = [
  'Tesla',
  'Mersedes',
  'BMW',
  'Toyota',
  'Zhiguli',
  'Moskvich',
  'Opel',
  'Aston Martin',
  'Porshe',
  'Lada',
];

const names = [
  'Model S',
  'CLK',
  '7',
  'Camry',
  'Combi',
  '9',
  'Corsa',
  'DB9',
  'Cayene',
  'Calina',
];

const maxSymbolsInColor = 6;
const maxRandomCars = 100;

const getRandomName = (): string => {
  const model = models[Math.floor(Math.random() * models.length)];
  const name = names[Math.floor(Math.random() * names.length)];
  return `${model} ${name}`;
};

const getRandomColor = (): string => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < maxSymbolsInColor; i++) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
};

export const generateRandomCars = (count = maxRandomCars) =>
  new Array(count)
    .fill(1)
    .map(() => ({ name: getRandomName(), color: getRandomColor() }));

export const disableBtn = (btn?: Button): void => {
  btn?.getNode().setAttribute('disabled', '');
};

export const enableBtn = (btn?: Button): void => {
  btn?.getNode().removeAttribute('disabled');
};
