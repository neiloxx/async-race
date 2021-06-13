import Control from '../../../components/elements/control';
import ControlArray from '../../../components/elements/control-array';
import './style.scss';
import {
  createInputName,
  createInputColor,
  createBtn,
  updateInputName,
  updateInputColor,
  updateBtn,
} from './inputs/inputs';

export default class InputsField extends Control {
  createWrapper: ControlArray;

  updateWrapper: ControlArray;

  constructor(
    parent: HTMLElement,
    tagName: keyof HTMLElementTagNameMap,
    className = '',
  ) {
    super(parent, tagName, className);

    this.createWrapper = new ControlArray(
      'div',
      'garage__inputs-create',
      [createInputName, createInputColor, createBtn],
      this.node,
    );
    this.updateWrapper = new ControlArray(
      'div',
      'garage__inputs-update',
      [updateInputName, updateInputColor, updateBtn],
      this.node,
    );
  }
}
