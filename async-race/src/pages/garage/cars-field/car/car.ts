import Control from '../../../../components/elements/control';
import { ICar } from '../../../../api/interfaces';
import ControlArray from '../../../../components/elements/control-array';
import './style.scss';
import Button from '../../../../components/elements/button/button';
import {
  disableBtn,
  enableBtn,
  IRenderCar,
  renderCar,
  startDriving,
  stopDriving,
} from '../../../../utils/utils';

export default class Car extends Control implements ICar {
  name: string;

  color: string;

  id?: number;

  selectBtn: Button;

  removeBtn: Button;

  startBtn: Button;

  resetBtn: Button;

  car: ICar;

  image?: IRenderCar;

  wrapper?: ControlArray;

  constructor(
    car: ICar,
    selectCar: (car: ICar) => void = () => {},
    removeCar: (car: ICar) => void = () => {},
  ) {
    super(undefined, 'div', 'cars-field__car');
    this.name = car.name;
    this.color = car.color;
    this.id = car.id;
    this.startBtn = new Button(undefined, 'car__btn btn', 'Start');
    this.resetBtn = new Button(undefined, 'car__btn btn reset', 'Reset', true);
    const carName = new Control(undefined, 'p', 'car__text', this.name);

    this.selectBtn = new Button(undefined, 'car__btn btn', 'Select');
    this.removeBtn = new Button(undefined, 'car__btn btn', 'Remove');

    this.car = car;
    if (!car.id) return;
    this.image = renderCar(car.id, car.color, 'car__image');
    this.wrapper = new ControlArray(
      'div',
      'car__wrapper',
      [
        new ControlArray('div', 'car__race', [
          this.startBtn,
          this.resetBtn,
          carName,
        ]),
        new ControlArray('div', 'car__inner', [
          new ControlArray('div', 'car__settings', [
            this.selectBtn,
            this.removeBtn,
          ]),
          this.image.imageEl,
        ]),
      ],
      this.node,
    );

    this.handleStartCar();
    this.handleResetCar();
    this.selectBtn.getNode().onclick = () => selectCar(this);
    this.removeBtn.getNode().onclick = () => removeCar(this);
  }

  handleStartCar(): void {
    this.startBtn.getNode().onclick = async () => {
      enableBtn([this.resetBtn.getNode()]);
      disableBtn([this.startBtn.getNode()]);
      if (!this.id || !this.image) return;
      startDriving(this.id).catch();
    };
  }

  handleResetCar(): void {
    this.resetBtn.getNode().onclick = async () => {
      stopDriving(this.id || 0)
        .then(() => {
          enableBtn([this.startBtn.getNode()]);
          disableBtn([this.resetBtn.getNode()]);
        })
        .catch();
    };
  }
}
