import Control from '../../../../components/elements/control';
import { ICar, IWinner } from '../../../../api/interfaces';
import { renderCar } from '../../../../utils/utils';

export default class Winner extends Control {
  num: number;

  constructor(num: number, winner: IWinner, car: ICar) {
    super(undefined, 'div', 'row-wrapper');
    this.num = num;

    const number = new Control(undefined, 'div', 'column-number', `${num}`);

    const image = renderCar(car.id || 0, car.color, 'column-image', true);

    const name = new Control(undefined, 'div', 'column-name', `${car.name}`);

    const wins = new Control(undefined, 'div', 'column-wins', `${winner.wins}`);

    const time = new Control(undefined, 'div', 'column-time', `${winner.time}`);

    this.node.append(
      number.getNode(),
      image.imageEl.getNode(),
      name.getNode(),
      wins.getNode(),
      time.getNode(),
    );
  }
}
