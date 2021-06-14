import Control from '../../../components/elements/control';
import store from '../../../store/store';
import Car from './car/car';
import './style.scss';
import { ICar } from '../../../api/interfaces';

export default class CarsField extends Control {
  constructor(
    parent?: HTMLElement,
    className = '',
    selectCar: (car: ICar) => void = () => {},
  ) {
    super(parent, 'div', className);
    for (let i = 0; i < store.cars.length; i++) {
      this.node.appendChild(new Car(store.cars[i], selectCar).getNode());
    }
  }
}
