import Control from '../../../components/elements/control';
import './style.scss';
import store from '../../../store/store';
import Winner from './winner/winner';
import { getCar } from '../../../api/cars';
import { ICar } from '../../../api/interfaces';

export default class WinnersTable extends Control {
  constructor() {
    super(undefined, 'div', 'table');
    Promise.all(store.winners.map(winner => getCar(winner.id))).then(
      winners => {
        winners.forEach((winner, idx) => {
          const number =
            (store.winnersPage - 1) * store.maxWinnersOnPage + (idx + 1);
          this.node.appendChild(
            new Winner(number, store.winners[idx], winner).getNode(),
          );
        });
      },
    );
  }

  getCar = async (id: number): Promise<ICar> => {
    const response = await getCar(id);
    return {
      name: response.name,
      color: response.color,
    };
  };
}
