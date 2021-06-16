import Button from '../components/elements/button/button';
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

export const getPositionAtCentre = (el: HTMLElement) => {
  const { top, left, width, height } = el.getBoundingClientRect();
  return {
    x: left + width / 2,
    y: top + height / 2,
  };
};

export const getDistance = (a: HTMLElement, b: HTMLElement): number => {
  const positionA = getPositionAtCentre(a);
  const positionB = getPositionAtCentre(b);
  return Math.hypot(positionA.x - positionB.x, positionA.y - positionB.y);
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
//
// export const raceAll = async (
//   promises: Array<IRace>,
//   idxs: Array<number>,
// ) => {
//   const { success, id, time }: ICar | number = await Promise.race(promises);
//   const ms = 1000;
//   if (!success) {
//     const failedCarIdx = idxs.findIndex(idx => idx === id);
//     const restPromises = [
//       ...promises.slice(0, failedCarIdx),
//       ...promises.slice(failedCarIdx + 1),
//       promises.length,
//     ];
//     const restIdxs = [
//       ...idxs.slice(0, failedCarIdx),
//       ...idxs.slice(failedCarIdx + 1),
//       idxs.length,
//     ];
//     return raceAll(restPromises, restIdxs);
//   }
//   return { ...store.cars.find(car => car.id), time: +(time / ms).toFixed(2) };
// };
//
// export const race = async (action: (id?: number) => void) => {
//   const promises = store.cars.map(({ id }) => action(id));
//   return await raceAll(
//     promises,
//     store.cars.map(car => car.id),
//   );
// };

export const renderCar = (
  id: number,
  color: string,
  className = '',
): IRenderCar => {
  const svg = `<svg id="car-${id}" class="car" enable-background="new 0 0 505.503 505.503" height="50" viewBox="0 0 505.503 505.503" width="50" xmlns="http://www.w3.org/2000/svg"><g><g><path d="m342.197 252.58h121.296v57.796h-121.296z" fill="#2f4859"/><path d="m491.381 231.134s14.413 1.524 14.117 7.87c-1.284 24.005-6.934 47.574-16.675 69.551h-18.838z" fill="#3a556a"/><path d="m403.484 270.287c-25.182 0-45.597 20.414-45.597 45.597s20.414 45.597 45.597 45.597c25.182 0 45.597-20.414 45.597-45.597 0-.016 0-.033 0-.049 0-25.155-20.393-45.548-45.548-45.548-.016 0-.032 0-.049 0z" fill="#3a556a"/><path d="m403.484 288.83c-14.941-.027-27.075 12.062-27.102 27.004-.027 14.941 12.062 27.075 27.004 27.102 14.941.027 27.075-12.062 27.102-27.004 0-.033 0-.066 0-.098 0-14.913-12.091-27.004-27.004-27.004z" fill="#ebf0f3"/><path d="m403.484 306.834c-5.106 0-9.247 4.141-9.247 9.247s4.141 9.247 9.247 9.247 9.247-4.141 9.247-9.247c0-5.108-4.139-9.247-9.247-9.247z" fill="#3a556a"/><path d="m481.643 308.162-16.232 3.247c-3.43.669-6.858-1.157-8.214-4.378l-9.837-24.594c-3.269-7.979-11.053-13.175-19.674-13.133h-44.909c-9.243-.04-17.436 5.941-20.216 14.757l-10.722 34.923c-2.854 8.953-11.263 14.961-20.659 14.757l-160.596-3.345c-9.693-.207-18.005-6.977-20.167-16.429l-2.311-9.837c-2.221-9.591-10.766-16.381-20.61-16.38h-43.188c-7.294-.036-14.093 3.68-18.002 9.837l-8.854 14.657c-3.83 6.274-10.653 10.095-18.002 10.083h-34.433s0-17.707 3.542-58.484 62.862-47.81 62.862-47.81v-.934c0-.443 0-1.082.344-1.821v-.836c1.821-6.985 7.919-23.414 28.529-43.334 27.446-26.561 142.643-28.283 174.468-22.134 6.585 1.513 12.75 4.47 18.052 8.657 3.775 9.103 8.368 17.845 13.723 26.118 7.182 9.542 18.938 15.444 22.282 21.397 1.082 1.967 3.837 3.886 4.378 4.919.554 1.105 1.667 1.821 2.902 1.87 52.1 2.517 103.879 9.595 154.743 21.151 16.476 23.068-9.199 77.076-9.199 77.076z" fill="${color}"/><path d="m5.707 308.948.344-8.214c-2.939-.032-5.482 2.036-6.051 4.919v11.854c-.027 3.233 2.572 5.875 5.804 5.902h.049 16.724v-14.264c-5.62.404-11.263.338-16.87-.197z" fill="#3a556a"/><path d="m468.952 301.275h17.265c3.015 0 5.46 2.444 5.46 5.46v3.689c0 3.015-2.444 5.46-5.46 5.46h-17.265c-3.015 0-5.46-2.444-5.46-5.46v-3.689c.001-3.016 2.445-5.46 5.46-5.46z" fill="#3a556a"/><path d="m317.947 212.591-36.842-49.68c-3.692-4.983-9.444-8.021-15.642-8.264l-59.615-2.262c-49.826.836-74.42 12.149-86.275 21.495-13.035 10.28-14.067 20.216-14.116 20.659v68.026c.027 6.881 5.613 12.445 12.494 12.444h26.266c9.882.024 18.664 6.301 21.888 15.642l7.575 21.888h134.92c6.419-.027 11.609-5.239 11.609-11.658v-81.356c.012-2.494-.782-4.927-2.262-6.934zm-150.611 77.814c-3.438-9.834-12.7-16.436-23.119-16.478h-26.266c-6.167.001-11.166-4.997-11.167-11.164 0-.066 0-.132.001-.199v-67.928c0-.59 1.377-10.132 13.723-19.674s35.857-20.216 84.701-21.101l6.936 157.695h-37.53zm151.595 10.673c0 5.705-4.624 10.329-10.329 10.329h-95.227l-6.836-157.695 59.025 2.262c5.84.138 11.289 2.971 14.757 7.673l36.349 49.729c1.334 1.773 2.058 3.929 2.065 6.148z" fill="#f7be56"/><g fill="#3a556a"><path d="m214.949 170.142.934 33.989c.157 2.763 2.445 4.924 5.214 4.919h68.862c2.88-.027 5.191-2.383 5.164-5.263-.009-.957-.281-1.893-.787-2.706l-21.249-33.349c-.944-1.481-2.572-2.388-4.328-2.411l-48.597-.59c-2.71-.177-5.052 1.877-5.229 4.587-.017.275-.013.55.016.824z"/><path d="m194.044 204.031-1.77-33.939c0-2.716-2.202-4.919-4.919-4.919-14.757-.885-60.795-.492-72.453 36.742-.422 1.396-.262 2.904.443 4.181l1.919 3.296c.943 1.802 2.897 2.838 4.919 2.606l67.092-2.509c2.8-.233 4.912-2.648 4.769-5.458z"/><path d="m333.737 208.066c-8.854-13.28-29.513-42.498-40.382-52.434-.59 0-8.214 0-6.1 4.525 1.672 3.738 16.085 19.674 24.594 31.824 5.386 7.566 13.058 13.203 21.888 16.085z"/><path d="m105.458 270.287c-25.182 0-45.597 20.414-45.597 45.597s20.414 45.597 45.597 45.597 45.597-20.414 45.597-45.597c0-.016 0-.033 0-.049 0-25.155-20.393-45.548-45.548-45.548-.016 0-.032 0-.049 0z"/></g><path d="m105.458 288.83c-14.941 0-27.053 12.113-27.053 27.053 0 14.941 12.113 27.053 27.053 27.053s27.053-12.113 27.053-27.053c0-.016 0-.033 0-.049 0-14.913-12.09-27.004-27.004-27.004-.016 0-.032 0-.049 0z" fill="#ebf0f3"/><path d="m105.458 306.834c-5.106 0-9.247 4.141-9.247 9.247s4.141 9.247 9.247 9.247 9.247-4.141 9.247-9.247c0-5.108-4.139-9.247-9.247-9.247z" fill="#3a556a"/></g></g></svg>`;
  const imageEl = new Control(undefined, 'div', className, svg);
  return { imageEl };
};
