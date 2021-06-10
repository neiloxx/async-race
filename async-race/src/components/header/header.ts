import './style.scss';
import ControlArray from '../elements/control-array';
import Link from '../elements/link/link';

export default class Header extends ControlArray {
  constructor(parent: HTMLElement) {
    super(parent, 'header', 'header', [
      new ControlArray(undefined, 'div', 'header__container', [
        new ControlArray(undefined, 'nav', 'header__nav nav', [
          new ControlArray(undefined, 'ul', 'nav-list', [
            new ControlArray(undefined, 'li', 'nav-list__item', [
              new Link(undefined, 'nav-list__item-link', '#', 'garage'),
            ]),
            new ControlArray(undefined, 'li', 'nav-list__item', [
              new Link(undefined, 'nav-list__item-link', '#winners', 'winners'),
            ]),
          ]),
        ]),
        new Link(undefined, 'settings', '#settings'),
      ]),
    ]);
  }
}
