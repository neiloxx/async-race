import Input from '../../../../components/elements/input/input';
import { IInput, IButton } from './interfaces';
import Button from '../../../../components/elements/button/button';

export const renderInputs = (): IInput => {
  const createInputName = new Input(
    undefined,
    'inputs-create__input-name input-name',
    'text',
    'name',
    'Name',
  );

  const createInputColor = new Input(
    undefined,
    'inputs-create__input-color input-color',
    'color',
    'color',
  );

  const updateInputName = new Input(
    undefined,
    'inputs-update__input-name input-name',
    'text',
    'name',
    'Name',
  );

  const updateInputColor = new Input(
    undefined,
    'inputs-update__input-color input-color',
    'color',
    'color',
  );

  return {
    createInputName,
    createInputColor,
    updateInputName,
    updateInputColor,
  };
};

export const renderButtons = (): IButton => {
  const createBtn = new Button(
    undefined,
    'inputs-create__button',
    'Create',
    true,
  );

  const updateBtn = new Button(
    undefined,
    'inputs-update__button',
    'Update',
    true,
  );

  const raceBtn = new Button(undefined, 'garage__button', 'Race');

  const resetBtn = new Button(undefined, 'garage__button', 'Reset');

  const createRandom = new Button(undefined, 'garage__button', 'Create random');

  return { createBtn, updateBtn, raceBtn, resetBtn, createRandom };
};
