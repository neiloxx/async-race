import './style.scss';
import Control from '../elements/control';
import Link from '../elements/link/link';
import ControlArray from '../elements/control-array';

export default class Header extends Control {
  element: Control;

  constructor(parent: HTMLElement) {
    super(parent, 'header', 'header');

    const garageItem = new ControlArray('li', 'nav-list__item', [
      new Link(undefined, 'nav-list__item-link', '#', 'garage'),
    ]);
    const winnersItem = new ControlArray('li', 'nav-list__item', [
      new Link(undefined, 'nav-list__item-link', '#winners', 'winners'),
    ]);

    this.element = new ControlArray(
      'div',
      'header__container',
      [
        new ControlArray('nav', 'header__nav nav', [
          new ControlArray('ul', 'nav-list', [garageItem, winnersItem]),
        ]),
      ],
      this.node,
    );
  }
}
