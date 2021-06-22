import Control from './components/elements/control';
import Header from './components/header/header';
import './style.scss';
import Garage from './pages/garage/garage';
import Winners from './pages/winners/winners';
import store from './store/store';
import { switchActiveRoute } from './utils/utils';

export class App {
  header: Header;

  main: Control;

  constructor(parent: HTMLElement) {
    this.header = new Header(parent);
    this.main = new Control(parent, 'main', 'main', '');
  }

  getAsync = async (): Promise<void> => {
    await store.getValues();
  };

  init(): void {
    this.getAsync().then(() => {
      const garage = new Garage();
      const winners = new Winners();

      this.main.getNode().append(garage.getNode(), winners.getNode());

      this.watchButtons(garage, winners);
    });
  }

  watchButtons(garage: Garage, winners: Winners): void {
    this.header.garageState.getNode().onclick = () => {
      this.header.garageState.getNode().classList.add('active');
      this.header.winnersState.getNode().classList.remove('active');
      switchActiveRoute(garage, winners);
    };
    this.header.winnersState.getNode().onclick = () => {
      this.header.garageState.getNode().classList.remove('active');
      this.header.winnersState.getNode().classList.add('active');
      switchActiveRoute(winners, garage);
    };
  }
}
