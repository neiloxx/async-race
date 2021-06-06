import Control from './components/elements/control';
import './style.css';

class App {
  main: Control;

  constructor(parent: HTMLElement) {
    this.main = new Control(parent, 'main', 'main', '');
    console.log(this.main);
  }
}

const app = new App(document.body);
