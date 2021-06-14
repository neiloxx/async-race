import ControlArray from '../../../components/elements/control-array';
import Control from '../../../components/elements/control';
import store from '../../../store/store';
import Button from '../../../components/elements/button/button';
import './style.scss';

export default class PagesContainer extends ControlArray {
  prevBtn: Button;

  nextBtn: Button;

  constructor() {
    super('div', 'garage__pages-container');
    this.prevBtn = new Button(undefined, 'pages__btn', '<', true);
    this.nextBtn = new Button(undefined, 'pages__btn', '>');

    const wrapper = new ControlArray('div', 'garage__pages', [
      new Control(
        undefined,
        'h3',
        'garage__subtitle',
        `Page #${store.carsPage}`,
      ),
      new ControlArray('div', 'pages__buttons', [this.prevBtn, this.nextBtn]),
    ]);
    this.node.appendChild(wrapper.getNode());
  }
}
