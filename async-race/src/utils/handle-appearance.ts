import Button from '../components/elements/button/button';

export const disableBtn = (btn?: Button): void => {
  btn?.getNode().setAttribute('disabled', '');
};

export const enableBtn = (btn?: Button): void => {
  btn?.getNode().removeAttribute('disabled');
};
