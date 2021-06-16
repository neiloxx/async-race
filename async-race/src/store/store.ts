import {
  getCars,
  getWinners,
  maxCarsOnPage,
  maxWinnersOnPage,
} from '../api/cars';
import { ICar, IWinner } from '../api/interfaces';

export interface IState {
  step: number;
}

export interface IAnimationMap {
  [key: string]: IState;
}

class Store {
  garagePage = 1;

  cars: Array<ICar> = [];

  carsCount = 0;

  winnersPage = 1;

  winners: Array<IWinner> = [];

  winnersCount = 0;

  winnerNumber = 1;

  sortBy: 'wins' | 'time' | '' = '';

  sortOrder: 'ASC' | 'DESC' | '' = '';

  selectedCar: ICar | null = null;

  createInputNameValue = '';

  createInputColorValue = '#000000';

  updateInputNameValue = '';

  updateInputColorValue = '#000000';

  maxCarsOnPage = maxCarsOnPage;

  maxWinnersOnPage = maxWinnersOnPage;

  animation: IAnimationMap = {};

  onWinnersUpdate?: () => void;

  async getValues(): Promise<void> {
    await getCars(this.garagePage).then(res => {
      this.cars = res.items;
      this.carsCount = res.count;
    });
    await getWinners(
      this.winnersPage,
      this.maxWinnersOnPage,
      this.sortBy,
      this.sortOrder,
    ).then(res => {
      this.winners = res.items;
      this.winnersCount = res.count;
      if (this.onWinnersUpdate) {
        this.onWinnersUpdate();
      }
    });
  }
}

const store = new Store();
export default store;
