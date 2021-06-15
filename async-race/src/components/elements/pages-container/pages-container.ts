import ControlArray from '../control-array';
import Control from '../control';
import store from '../../../store/store';
import Button from '../button/button';
import './style.scss';

export default class PagesContainer extends ControlArray {
  prevBtn: Button;

  nextBtn: Button;

  constructor(element = '', numPage = 0) {
    super('div', `${element}__pages-container`);
    this.prevBtn = new Button(undefined, 'pages__btn', '<');
    this.nextBtn = new Button(undefined, 'pages__btn', '>');

    const wrapper = new ControlArray('div', `${element}__pages`, [
      new Control(undefined, 'h3', 'garage__subtitle', `Page #${numPage}`),
      new ControlArray('div', 'pages__buttons', [this.prevBtn, this.nextBtn]),
    ]);
    this.node.appendChild(wrapper.getNode());
  }
}
