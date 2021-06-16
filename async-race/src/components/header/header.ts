import './style.scss';
import Control from '../elements/control';
import Link from '../elements/link/link';
import ControlArray from '../elements/control-array';

export default class Header extends Control {
  element: Control;

  garageState: Control;

  winnersState: Control;

  constructor(parent: HTMLElement) {
    super(parent, 'header', 'header');

    this.garageState = new Control(
      undefined,
      'li',
      'nav-list__item active',
      'garage',
    );
    this.winnersState = new Control(
      undefined,
      'li',
      'nav-list__item',
      'winners',
    );

    this.element = new ControlArray(
      'div',
      'header__container',
      [
        new ControlArray('nav', 'header__nav nav', [
          new ControlArray('ul', 'nav-list', [
            this.garageState,
            this.winnersState,
          ]),
        ]),
      ],
      this.node,
    );
  }

  watchButtons(): void {
    this.garageState.getNode().onclick = () => {
      this.winnersState.getNode().classList.remove('active');
      this.garageState.getNode().classList.add('active');
    };
    this.winnersState.getNode().onclick = () => {
      this.garageState.getNode().classList.remove('active');
      this.winnersState.getNode().classList.add('active');
    };
  }
}
