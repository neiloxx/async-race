import Control from './control';

export default class ControlArray extends Control {
  constructor(
    parent?: HTMLElement,
    tagName = '',
    className = '',
    children: Array<Control> = [],
  ) {
    super(parent, tagName, className);
    children.forEach(child => {
      child.setParent(this.node);
    });
  }
}
