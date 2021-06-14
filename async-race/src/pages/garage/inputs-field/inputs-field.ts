import Control from '../../../components/elements/control';
import ControlArray from '../../../components/elements/control-array';
import { renderInputs, renderButtons } from './render-el/render-el';
import './style.scss';
import { ICar } from '../../../api/interfaces';
import store from '../../../store/store';
import { disableBtn, enableBtn } from '../../../utils/utils';
import Button from '../../../components/elements/button/button';

export default class InputsField extends Control {
  createWrapper: ControlArray;

  updateWrapper: ControlArray;

  renderInput = renderInputs();

  renderBtn = renderButtons();

  createValue = store.createInputNameValue;

  createColor = store.createInputColorValue;

  buttonWrapper: ControlArray;

  raceBtn = this.renderBtn.raceBtn;

  resetBtn = this.renderBtn.resetBtn;

  createRandom = this.renderBtn.createRandom;

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

    this.buttonWrapper = new ControlArray(
      'div',
      'garage__btns-container',
      [this.raceBtn, this.resetBtn, this.createRandom],
      this.node,
    );
  }

  watchInputs(): void {
    this.handleCreateInputs();

    if (store.selectedCar) {
      this.handleUpdateInputs(store.selectedCar);
    }
  }

  getInputsValue = (): ICar => {
    return {
      name: store.createInputNameValue,
      color: store.createInputColorValue,
    };
  };

  getUpdatedValue = (): ICar => {
    if (!store.selectedCar) throw new Error("There's no selected car");
    return {
      name: store.selectedCar.name,
      color: store.selectedCar.color,
    };
  };

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

  handleUpdateInputs(car: ICar): void {
    const inputName =
      this.renderInput.updateInputName.getNode() as HTMLInputElement;
    inputName.value = car.name;
    store.updateInputNameValue = car.name;
    const inputColor =
      this.renderInput.updateInputColor.getNode() as HTMLInputElement;
    inputColor.value = car.color;
    store.updateInputColorValue = car.color;

    enableBtn(this.renderBtn.updateBtn);

    this.renderInput.updateInputName.getNode().oninput = (event: Event) => {
      const input = <HTMLInputElement>event.target;
      enableBtn(this.renderBtn.updateBtn);
      if (!input.value) {
        disableBtn(this.renderBtn.updateBtn);
      }
      car.name = input.value;
    };

    this.renderInput.updateInputColor.getNode().oninput = (event: Event) => {
      const input = <HTMLInputElement>event.target;
      car.color = input.value;
    };
  }
}
