import Input from '../../../../components/elements/input/input';
import Control from '../../../../components/elements/control';
import './style.scss';

export const createInputName = new Input(
  undefined,
  'inputs-create__input-name input-name',
  'text',
  'name',
  'Name',
);

export const createInputColor = new Input(
  undefined,
  'inputs-create__input-color input-color',
  'color',
  'color',
);

export const createBtn = new Control(
  undefined,
  'button',
  'inputs-create__button',
  'Create',
);

export const updateInputName = new Input(
  undefined,
  'inputs-update__input-name input-name',
  'text',
  'name',
  'Name',
);

export const updateInputColor = new Input(
  undefined,
  'inputs-update__input-color input-color',
  'color',
  'color',
);

export const updateBtn = new Control(
  undefined,
  'button',
  'inputs-update__button',
  'Update',
);
