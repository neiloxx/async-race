import Garage from '../../../pages/garage/garage';
import Winners from '../../../pages/winners/winners';
import PagesContainer from './pages-container';
import store from '../../../store/store';

export const pageHandler = (
  parent: Garage | Winners,
  pages?: PagesContainer,
): void => {
  if (!pages) throw new Error("There's no more pages");
  pages.nextBtn.getNode().onclick = () => {
    if (store.winnersPage * store.maxWinnersOnPage < store.winnersCount) {
      store.winnersPage++;
      store.getValues().then(() => parent.render());
    }
  };
  pages.prevBtn.getNode().onclick = () => {
    if (store.winnersPage - 1 >= 1) {
      store.winnersPage--;
      store.getValues().then(() => parent.render());
    }
  };
};
