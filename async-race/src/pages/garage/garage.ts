import Control from '../../components/elements/control';
import './style.scss';
import ControlArray from '../../components/elements/control-array';
import store from '../../store/store';
import InputsField from './inputs-field/inputs-field';

export default class Garage extends Control {
  wrapper: ControlArray;

  inputsField: Control;

  constructor(parent: HTMLElement) {
    super(parent, 'section', 'garage');
    this.inputsField = new InputsField(this.node, 'div', 'garage__inputs');

    const title = new Control(
      undefined,
      'h2',
      'garage__title',
      `garage(${store.carsCount})`,
    );

    this.wrapper = new ControlArray(
      'div',
      'garage__container',
      [title],
      this.node,
    );
  }
}
