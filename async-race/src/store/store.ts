import { getCars } from '../api/cars';
import { ICar } from '../api/interfaces';

class Store {
  carsPage = 1;

  cars: Array<ICar> = [];

  carsCount = 0;

  async getValues(): Promise<void> {
    await getCars(1).then(res => {
      this.cars = res.items;
      this.carsCount = res.count;
    });
  }
}

const store = new Store();
export default store;
