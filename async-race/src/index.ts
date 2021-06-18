import Control from './components/elements/control';
import Header from './components/header/header';
import './style.scss';
import Garage from './pages/garage/garage';
import Winners from './pages/winners/winners';
import store from './store/store';
import { pageHandler } from './utils/utils';

class App {
  header: Header;

  main: Control;

  constructor(parent: HTMLElement) {
    this.header = new Header(parent);
    this.main = new Control(parent, 'main', 'main', '');
    this.getAsync().then(() => {
      const garage = new Garage();
      const winners = new Winners();

      this.main.getNode().append(garage.getNode(), winners.getNode());

      pageHandler(garage, garage.pages);
      pageHandler(winners, winners.pages);
      this.watchButtons(garage, winners);
    });
  }

  getAsync = async (): Promise<void> => {
    await store.getValues();
  };

  watchButtons(garage: Garage, winners: Winners): void {
    this.header.garageState.getNode().onclick = () => {
      this.header.winnersState.getNode().classList.remove('active');
      this.header.garageState.getNode().classList.add('active');
      garage.getNode().style.display = 'flex';
      winners.getNode().style.display = 'none';
    };
    this.header.winnersState.getNode().onclick = () => {
      this.header.garageState.getNode().classList.remove('active');
      this.header.winnersState.getNode().classList.add('active');
      winners.getNode().style.display = 'flex';
      garage.getNode().style.display = 'none';
    };
  }
}
const app = new App(document.body);
