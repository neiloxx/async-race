import Control from '../components/elements/control';
import { ICar } from '../api/interfaces';
import { drive, startEngine, stopEngine } from '../api/cars';
import store, { IState } from '../store/store';

export interface IRenderCar {
  imageEl: Control;
}

export interface IRace {
  success: Array<ICar> | boolean;
  id: number;
  animationTime: number;
}

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

export const generateRandomCars = (count = maxRandomCars): Array<ICar> =>
  new Array(count)
    .fill(1)
    .map(() => ({ name: getRandomName(), color: getRandomColor() }));

export const disableBtn = (btns: Array<HTMLElement | Element>): void => {
  btns.forEach(btn => btn.setAttribute('disabled', ''));
};

export const enableBtn = (btns: Array<HTMLElement | Element>): void => {
  btns.forEach(btn => btn.removeAttribute('disabled'));
};

export const animate = (
  carId: number,
  car: HTMLElement,
  distance: number,
  animationTime: number,
): IState => {
  let start: number | null = null;
  const state: IState = { step: 0 };

  const step = (timestamp: number): void => {
    if (!start) {
      start = timestamp;
    }
    const time = timestamp - start;
    const passedTime = (time * distance) / animationTime;

    car.style.left = `${Math.min(passedTime, distance)}%`;
    if (passedTime < distance) {
      state.step = window.requestAnimationFrame(step);
    }
  };

  state.step = window.requestAnimationFrame(step);
  return state;
};

export const startDriving = async (id: number): Promise<IRace> => {
  const { velocity, distance } = await startEngine(id);

  const animationTime = Math.round(distance / velocity);
  const car = document.getElementById(`car-${id}`);

  const htmlDistance = 100;

  if (!car) throw new Error("There's no such car");
  store.animation[id] = animate(id, car, htmlDistance, animationTime);
  return drive(id).then(res => {
    if (!res.success) {
      window.cancelAnimationFrame(store.animation[id].step);
    }
    return { success: res.success, id, animationTime };
  });
};

export const stopDriving = async (id: number): Promise<void> => {
  const car = document.getElementById(`car-${id}`);
  await stopEngine(id);
  window.cancelAnimationFrame(store.animation[id].step);
  if (car) car.style.left = '0';
};

export const renderCar = (
  id: number,
  color: string,
  className = '',
  winners = false,
): IRenderCar => {
  const svg = `<svg height="50" width="50" class="car" ${
    !winners && `id="car-${id}"`
  } viewBox="0 0 505.503 505.503" xmlns="http://www.w3.org/2000/svg">
      <use xlink:href="/assets/sprite.svg#car" fill="${color}"></use>
    </svg>
`;
  const imageEl = new Control(undefined, 'div', className, svg);
  return { imageEl };
};

export const switchActiveRoute = (
  toActivate: Control,
  toDisable: Control,
): void => {
  toActivate.getNode().style.display = 'flex';
  toDisable.getNode().style.display = 'none';
};
