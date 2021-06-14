import Control from '../../../components/elements/control';
import ControlArray from '../../../components/elements/control-array';
import { renderInputs, renderButtons } from './render-el/render-el';
import './style.scss';
import { ICar } from '../../../api/interfaces';
import store from '../../../store/store';
import { disableBtn, enableBtn } from '../../../utils/handle-appearance';

export default class InputsField extends Control {
  createWrapper: ControlArray;

  updateWrapper: ControlArray;

  renderInput = renderInputs();

  renderBtn = renderButtons();

  createValue = store.createInputNameValue;

  createColor = store.createInputColorValue;

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
    if (this.createValue) {
      enableBtn(this.renderBtn.createBtn);
    }
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
    this.handleCreateInputs();
  }

  getInputsValue(): ICar {
    return {
      name: this.createValue,
      color: this.createColor,
    };
  }

  handleCreateInputs(): void {
    const inputName =
      this.renderInput.createInputName.getNode() as HTMLInputElement;
    inputName.value = this.createValue;
    const inputColor =
      this.renderInput.createInputColor.getNode() as HTMLInputElement;
    inputColor.value = this.createColor;

    this.renderInput.createInputName.getNode().oninput = (event: Event) => {
      const input = <HTMLInputElement>event.target;
      store.createInputNameValue = input.value;
      enableBtn(this.renderBtn.createBtn);
      if (!store.createInputNameValue) {
        disableBtn(this.renderBtn.createBtn);
      }
    };

    this.renderInput.createInputColor.getNode().oninput = (event: Event) => {
      const input = <HTMLInputElement>event.target;
      store.createInputColorValue = input.value;
    };
  }
}
