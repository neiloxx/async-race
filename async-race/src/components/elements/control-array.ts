import Control from './control';

export default class ControlArray extends Control {
  constructor(
    parent?: HTMLElement,
    tagName: keyof HTMLElementTagNameMap = 'div',
    className = '',
    children: Array<Control> = [],
  ) {
    super(parent, tagName, className);
    children.forEach(child => {
      child.setParent(this.node);
    });
  }
}
