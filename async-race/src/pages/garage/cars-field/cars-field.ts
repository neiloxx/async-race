import Control from '../../../components/elements/control';
import store from '../../../store/store';
import Car from './car/car';
import './style.scss';

export default class CarsField extends Control {
  constructor(parent?: HTMLElement, className = '') {
    super(parent, 'div', className);
    for (let i = 0; i < store.cars.length; i++) {
      this.node.appendChild(new Car(store.cars[i]).getNode());
    }
  }
}
