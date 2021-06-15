import Control from '../../../../components/elements/control';
import { ICar, IWinner } from '../../../../api/interfaces';
import store from '../../../../store/store';
import { renderCar } from '../../../../utils/utils';

export default class Winner extends Control {
  counter = store.winnerNumber;

  constructor(winner: IWinner, car: ICar) {
    super(undefined, 'div', 'row-wrapper');
    store.winnerNumber++;
    const number = new Control(
      undefined,
      'div',
      'column-number',
      `${this.counter}`,
    );

    const image = renderCar(car.color, 'column-image');

    const name = new Control(undefined, 'div', 'column-name', `${car.name}`);

    const wins = new Control(undefined, 'div', 'column-wins', `${winner.wins}`);

    const time = new Control(undefined, 'div', 'column-time', `${winner.time}`);

    this.node.append(
      number.getNode(),
      image.getNode(),
      name.getNode(),
      wins.getNode(),
      time.getNode(),
    );
  }
}
