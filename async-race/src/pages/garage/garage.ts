import Control from '../../components/elements/control';
import './style.scss';
import ControlArray from '../../components/elements/control-array';
import store from '../../store/store';
import InputsField from './inputs-field/inputs-field';
import CarsField from './cars-field/cars-field';
import { createCar } from '../../api/cars';
import PagesContainer from './pages-container/pages-container';

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
        this.node.innerHTML = '';
        this.render();
      });
    };
  }

  render(): void {
    this.inputsField = new InputsField(this.node, 'div', 'garage__inputs');
    this.inputsField.watchInputs();
    this.title = new Control(
      undefined,
      'h2',
      'garage__title',
      `garage(${store.carsCount})`,
    );
    this.pages = new PagesContainer();

    this.carsField = new CarsField(undefined, 'garage__cars-field');
    this.startObserve();

    this.wrapper = new ControlArray(
      'div',
      'garage__container',
      [this.title, this.pages, this.carsField],
      this.node,
    );
  }
}
