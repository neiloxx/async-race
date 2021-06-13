import Control from '../control';

export default class Input extends Control {
  constructor(
    parent?: HTMLElement,
    classList = '',
    type = '',
    name = '',
    placeholder?: string,
  ) {
    super(parent, 'input', classList);
    this.node.setAttribute('type', type);
    this.node.setAttribute('name', name);
    if (placeholder) {
      this.node.setAttribute('placeholder', placeholder);
    }
  }
}
