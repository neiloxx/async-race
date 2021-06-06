export default class Control {
  node: HTMLElement;

  protected parent?: HTMLElement;

  constructor(
    parent?: HTMLElement,
    tagName = '',
    className = '',
    innerContent = '',
    children?: Array<Control>,
  ) {
    const el = document.createElement(tagName);
    el.className = className;
    el.innerHTML = innerContent;
    this.parent = parent;
    this.node = el;
    parent?.appendChild(this.node);
    if (children) {
      this.setParent(this.node);
    }
  }

  setParent(parent: HTMLElement): void {
    if (!this.parent) {
      this.parent = parent;
      this.parent.appendChild(this.node);
    }
  }

  public getNode(): HTMLElement {
    return this.node;
  }
}
