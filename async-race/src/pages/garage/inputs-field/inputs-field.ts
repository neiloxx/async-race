import Control from '../../../components/elements/control';
import ControlArray from '../../../components/elements/control-array';
import { renderInputs, renderButtons } from './render-el/render-el';
import './style.scss';

export default class InputsField extends Control {
  createWrapper: ControlArray;

  updateWrapper: ControlArray;

  constructor(
    parent: HTMLElement,
    tagName: keyof HTMLElementTagNameMap,
    className = '',
  ) {
    super(parent, tagName, className);

    const renderInput = renderInputs();
    const renderBtn = renderButtons();

    this.createWrapper = new ControlArray(
      'div',
      'garage__inputs-create',
      [
        renderInput.createInputName,
        renderInput.createInputColor,
        renderBtn.createBtn,
      ],
      this.node,
    );
    this.updateWrapper = new ControlArray(
      'div',
      'garage__inputs-update',
      [
        renderInput.updateInputName,
        renderInput.updateInputColor,
        renderBtn.updateBtn,
      ],
      this.node,
    );
  }
}
