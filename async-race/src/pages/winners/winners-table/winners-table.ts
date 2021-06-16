import Control from '../../../components/elements/control';
import './style.scss';
import store from '../../../store/store';
import Winner from './winner/winner';
import { getCar } from '../../../api/cars';
import { ICar } from '../../../api/interfaces';

export default class WinnersTable extends Control {
  constructor() {
    super(undefined, 'div', 'table');
    for (let i = 0; i < store.winners.length; i++) {
      this.getCar(store.winners[i].id).then(res => {
        const number =
          (store.winnersPage - 1) * store.maxWinnersOnPage + (i + 1);
        this.node.appendChild(
          new Winner(number, store.winners[i], res).getNode(),
        );
      });
    }
  }

  getCar = async (id: number): Promise<ICar> => {
    const response = await getCar(id);
    return {
      name: response.name,
      color: response.color,
    };
  };
}
