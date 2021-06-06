import Control from '../control';

export default class Link extends Control {
  constructor(parent?: HTMLElement, className = '', href = '', content = '') {
    super(parent, 'a', className, content);
    this.node.setAttribute('href', href);
  }
}
