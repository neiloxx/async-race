import Control from '../../../components/elements/control';
import ControlArray from '../../../components/elements/control-array';
import { renderInputs, renderButtons } from './render-el/render-el';
import './style.scss';
import { ICar } from '../../../api/interfaces';

export default class InputsField extends Control {
  createWrapper: ControlArray;

  updateWrapper: ControlArray;

  renderInput = renderInputs();

  renderBtn = renderButtons();

  value = '';

  color = '#000000';

  constructor(
    parent: HTMLElement,
    tagName: keyof HTMLElementTagNameMap,
    className = '',
  ) {
    super(parent, tagName, className);
    this.createWrapper = new ControlArray(
      'div',
      'garage__inputs-create',
      [
        this.renderInput.createInputName,
        this.renderInput.createInputColor,
        this.renderBtn.createBtn,
      ],
      this.node,
    );
    this.updateWrapper = new ControlArray(
      'div',
      'garage__inputs-update',
      [
        this.renderInput.updateInputName,
        this.renderInput.updateInputColor,
        this.renderBtn.updateBtn,
      ],
      this.node,
    );
  }

  watchInputs(): void {
    this.renderInput.createInputName.getNode().oninput = (event: Event) => {
      const input = <HTMLInputElement>event.target;
      this.value = input.value;
      this.activateBtn();
      if (!this.value) {
        this.blockBtn();
      }
    };
    this.renderInput.createInputColor.getNode().oninput = (event: Event) => {
      const input = <HTMLInputElement>event.target;
      this.color = input.value;
    };
  }

  getInputsValue(): ICar {
    return {
      name: this.value,
      color: this.color,
    };
  }

  activateBtn(): void {
    this.renderBtn.createBtn.getNode().removeAttribute('disabled');
  }

  blockBtn(): void {
    this.renderBtn.createBtn.getNode().setAttribute('disabled', '');
  }
}
