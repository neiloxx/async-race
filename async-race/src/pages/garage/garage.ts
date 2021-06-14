import Control from '../../components/elements/control';
import './style.scss';
import ControlArray from '../../components/elements/control-array';
import store from '../../store/store';
import InputsField from './inputs-field/inputs-field';
import CarsField from './cars-field/cars-field';
import { createCar, updateCar } from '../../api/cars';
import PagesContainer from './pages-container/pages-container';
import { ICar } from '../../api/interfaces';

export default class Garage extends Control {
  wrapper?: ControlArray;

  inputsField?: InputsField;

  carsField?: CarsField;

  title?: Control;

  pages?: PagesContainer;

  constructor(parent: HTMLElement) {
    super(parent, 'section', 'garage');
    this.render();
  }

  startObserve(): void {
    if (!this.inputsField) throw new Error("There's no render elements");
    this.inputsField.renderBtn.createBtn.getNode().onclick = () => {
      const newCar = this.inputsField?.getInputsValue();
      if (!newCar?.name) throw new Error("There's no new car");
      createCar(newCar).then(async () => {
        await store.getValues();
        store.createInputNameValue = '';
        store.createInputColorValue = '#000000';
        this.render();
      });
    };

    this.inputsField.renderBtn.updateBtn.getNode().onclick = () => {
      const updatedCar = this.inputsField?.getUpdatedValue();
      if (store.selectedCar?.id && updatedCar) {
        updateCar(store.selectedCar?.id, updatedCar).then(async () => {
          await store.getValues();
          store.selectedCar = null;
          this.render();
        });
      }
    };

    this.pageHandler();
  }

  render(): void {
    this.node.innerHTML = '';
    this.inputsField = new InputsField(this.node, 'div', 'garage__inputs');
    this.inputsField.watchInputs();
    this.title = new Control(
      undefined,
      'h2',
      'garage__title',
      `garage(${store.carsCount})`,
    );
    this.pages = new PagesContainer();

    this.carsField = new CarsField(
      undefined,
      'garage__cars-field',
      (car: ICar) => {
        if (car.id) {
          store.selectedCar = car;
          this.inputsField?.handleUpdateInputs(car);
        }
      },
    );
    this.startObserve();

    this.wrapper = new ControlArray(
      'div',
      'garage__container',
      [this.title, this.pages, this.carsField],
      this.node,
    );
  }

  pageHandler(): void {
    if (!this.pages) throw new Error("There's no more pages");
    this.pages.nextBtn.getNode().onclick = () => {
      if (store.carsPage * store.maxCarsOnPage < store.carsCount) {
        store.carsPage++;
        store.getValues().then(() => this.render());
      }
    };
    this.pages.prevBtn.getNode().onclick = () => {
      if (store.carsPage - 1 >= 1) {
        store.carsPage--;
        store.getValues().then(() => this.render());
      }
    };
  }
}
