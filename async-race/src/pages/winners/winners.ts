import Control from '../../components/elements/control';
import './style.scss';
import ControlArray from '../../components/elements/control-array';
import store from '../../store/store';
import PagesContainer from '../../components/elements/pages-container/pages-container';
import WinnersTable from './winners-table/winners-table';

export default class Winners extends Control {
  wrapper?: ControlArray;

  winnersTable?: WinnersTable;

  totalWins?: Control;

  bestTime?: Control;

  pages?: PagesContainer;

  constructor(parent?: HTMLElement) {
    super(parent, 'section', 'winners');
    this.render();
    store.onWinnersUpdate = () => {
      store.winnerNumber = 1;
      this.render();
    };
  }

  startObserve(): void {
    this.handleSortButtons();
  }

  handleSortButtons(): void {
    if (this.totalWins)
      this.totalWins.getNode().onclick = () => {
        store.sortOrder = store.sortOrder === 'ASC' ? 'DESC' : 'ASC';
        store.sortBy = 'wins';
        store.getValues().then(() => this.render());
      };
    if (this.bestTime)
      this.bestTime.getNode().onclick = () => {
        store.sortOrder = store.sortOrder === 'ASC' ? 'DESC' : 'ASC';
        store.sortBy = 'time';
        store.getValues().then(() => this.render());
      };
  }

  render(): void {
    this.node.innerHTML = '';
    const title = new Control(
      undefined,
      'h2',
      'winners__title',
      `Winners (${store.winnersCount})`,
    );
    this.pages = new PagesContainer('winners', store.winnersPage);
    this.totalWins = new Control(
      undefined,
      'div',
      'column-wins',
      'Total wins ↕',
    );
    this.bestTime = new Control(
      undefined,
      'div',
      'column-time',
      'Best time (seconds) ↕',
    );
    const rowWrapper = new ControlArray('div', 'row-wrapper table-header', [
      new Control(undefined, 'div', 'column-number', '№'),
      new Control(undefined, 'div', 'column-image', 'Car image'),
      new Control(undefined, 'div', 'column-name', 'Car name'),
      this.totalWins,
      this.bestTime,
    ]);
    this.winnersTable = new WinnersTable();
    this.wrapper = new ControlArray(
      'div',
      'winners__container',
      [title, this.pages, rowWrapper, this.winnersTable],
      this.node,
    );
    this.startObserve();
  }
}
