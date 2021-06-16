import Control from '../../../components/elements/control';
import './style.scss';

export default class PopUp extends Control {
  wrapper: Control;

  constructor(parent: HTMLElement) {
    super(parent, 'div', 'popup');
    this.wrapper = new Control(this.node, 'div', 'popup__container');
  }
}
