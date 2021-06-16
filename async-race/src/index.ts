import Control from './components/elements/control';
import Header from './components/header/header';
import './style.scss';
import Garage from './pages/garage/garage';
import Winners from './pages/winners/winners';
import store from './store/store';

class App {
  header: Header;

  main: Control;

  garage?: Control;

  winners?: Control;

  constructor(parent: HTMLElement) {
    this.header = new Header(parent);
    this.main = new Control(parent, 'main', 'main', '');
    this.getAsync().then(() => {
      this.garage = new Garage();
      this.winners = new Winners();
      this.main.getNode().append(this.garage.getNode(), this.winners.getNode());
      this.watchButtons();
    });
  }

  getAsync = async (): Promise<void> => {
    await store.getValues();
  };

  watchButtons(): void {
    this.header.garageState.getNode().onclick = () => {
      this.header.winnersState.getNode().classList.remove('active');
      this.header.garageState.getNode().classList.add('active');
      if (this.garage && this.winners) {
        this.garage.getNode().style.display = 'flex';
        this.winners.getNode().style.display = 'none';
      }
    };
    this.header.winnersState.getNode().onclick = () => {
      this.header.garageState.getNode().classList.remove('active');
      this.header.winnersState.getNode().classList.add('active');
      if (this.garage && this.winners) {
        this.winners.getNode().style.display = 'flex';
        this.garage.getNode().style.display = 'none';
      }
    };
  }
}
const app = new App(document.body);
