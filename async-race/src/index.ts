import Control from './components/elements/control';
import Header from './components/header/header';
import './style.scss';
import Garage from './pages/garage/garage';
import Winners from './pages/winners/winners';
import store from './store/store';

class App {
  header: Control;

  main: Control;

  constructor(parent: HTMLElement) {
    this.header = new Header(parent);
    this.main = new Control(parent, 'main', 'main', '');
  }

  getAsync = async (): Promise<void> => {
    await store.getValues();
  };
}
const app = new App(document.body);
const routerView = app.main.node;
const links = document.querySelectorAll('.nav-list__item-link');

let winnersPage: Winners;
let garagePage: Garage;

app.getAsync().then(() => {
  const onRouteChanged = (): Control => {
    const { hash } = window.location;
    store.getValues();
    if (!(routerView instanceof HTMLElement)) {
      throw new ReferenceError(
        'No router view element available for rendering',
      );
    }
    routerView.innerHTML = '';
    links.forEach(link => {
      if (link instanceof HTMLAnchorElement) {
        if (
          link.href.slice(link.href.lastIndexOf('#') + 1) ===
          hash.slice(hash.lastIndexOf('#') + 1)
        ) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      }
    });
    switch (hash) {
      case '':
        if (!garagePage) {
          garagePage = new Garage(routerView);
          return garagePage;
        }
        garagePage.replaceParent(routerView);
        return garagePage;
      case '#winners':
        if (!winnersPage) {
          winnersPage = new Winners(routerView);
          return winnersPage;
        }
        winnersPage.replaceParent(routerView);
        return winnersPage;
      default:
        if (!garagePage) {
          garagePage = new Garage(routerView);
          return garagePage;
        }
        garagePage.replaceParent(routerView);
        return garagePage;
    }
  };

  window.addEventListener('hashchange', onRouteChanged);
  onRouteChanged();
});
