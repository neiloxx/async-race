import Control from '../../../../components/elements/control';
import Button from '../../../../components/elements/button/button';

export interface IInput {
  createInputName: Control;
  createInputColor: Control;
  updateInputName: Control;
  updateInputColor: Control;
}

export interface IButton {
  createBtn: Button;
  updateBtn: Button;
}
