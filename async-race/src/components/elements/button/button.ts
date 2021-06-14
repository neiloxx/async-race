import Control from '../control';

export default class Button extends Control {
  constructor(
    parent?: HTMLElement,
    classList = '',
    content = '',
    disabled = false,
  ) {
    super(parent, 'button', classList, content);
    if (disabled) {
      this.node.setAttribute('disabled', 'true');
    }
  }
}
