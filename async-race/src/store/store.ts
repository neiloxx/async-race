import { getCars, maxCarsOnPage } from '../api/cars';
import { ICar } from '../api/interfaces';

class Store {
  carsPage = 1;

  cars: Array<ICar> = [];

  carsCount = 0;

  selectedCar: ICar | null = null;

  createInputNameValue = '';

  createInputColorValue = '#000000';

  updateInputNameValue = '';

  updateInputColorValue = '#000000';

  maxCarsOnPage = maxCarsOnPage;

  async getValues(): Promise<void> {
    await getCars(this.carsPage).then(res => {
      this.cars = res.items;
      this.carsCount = res.count;
    });
  }
}

const store = new Store();
export default store;
