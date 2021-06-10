import Control from './control';

export default class ControlArray extends Control {
  constructor(
    tagName: keyof HTMLElementTagNameMap = 'div',
    className = '',
    children: Array<Control> = [],
    parent?: HTMLElement,
  ) {
    super(parent, tagName, className);
    children.forEach(child => {
      child.setParent(this.node);
    });
  }
}
