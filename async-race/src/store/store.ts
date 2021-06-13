import { getCars } from '../api/cars';
import { Car } from '../api/interfaces';

class Store {
  carsPage = 1;

  cars: Array<Car> = [];

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
