import Control from '../../../../components/elements/control';
import { ICar } from '../../../../api/interfaces';
import ControlArray from '../../../../components/elements/control-array';
import './style.scss';
import Button from '../../../../components/elements/button/button';
import { renderCar } from '../../../../utils/utils';

export default class Car extends Control implements ICar {
  wrapper: ControlArray;

  name: string;

  color: string;

  id?: number;

  selectBtn: Button;

  removeBtn: Button;

  constructor(
    car: ICar,
    selectCar: (car: ICar) => void = () => {},
    removeCar: (car: ICar) => void = () => {},
  ) {
    super(undefined, 'div', 'cars-field__car');
    this.name = car.name;
    this.color = car.color;
    this.id = car.id;

    const startBtn = new Button(undefined, 'car__btn btn', 'Start');
    const resetBtn = new Button(undefined, 'car__btn btn', 'Reset');
    const carName = new Control(undefined, 'p', 'car__text', this.name);

    this.selectBtn = new Button(undefined, 'car__btn btn', 'Select');
    this.removeBtn = new Button(undefined, 'car__btn btn', 'Remove');

    this.wrapper = new ControlArray(
      'div',
      'car__wrapper',
      [
        new ControlArray('div', 'car__race', [startBtn, resetBtn, carName]),
        new ControlArray('div', 'car__inner', [
          new ControlArray('div', 'car__settings', [
            this.selectBtn,
            this.removeBtn,
          ]),
          renderCar(car.color, 'car__image'),
        ]),
      ],
      this.node,
    );

    this.selectBtn.getNode().onclick = () => selectCar(this);
    this.removeBtn.getNode().onclick = () => removeCar(this);
  }
}
