import Control from '../../components/elements/control';
import './style.scss';
import ControlArray from '../../components/elements/control-array';
import store from '../../store/store';
import InputsField from './inputs-field/inputs-field';
import CarsField from './cars-field/cars-field';
import {
  createCar,
  createWinner,
  deleteCar,
  deleteWinner,
  startEngine,
  updateCar,
  updateWinner,
} from '../../api/cars';
import PagesContainer from '../../components/elements/pages-container/pages-container';
import { ICar } from '../../api/interfaces';
import {
  disableBtn,
  enableBtn,
  generateRandomCars,
  startDriving,
  stopDriving,
} from '../../utils/utils';
import PopUp from './popup/popup';

const msInSecond = 1000;

export default class Garage extends Control {
  wrapper?: ControlArray;

  inputsField?: InputsField;

  carsField?: CarsField;

  title?: Control;

  pages?: PagesContainer;

  popup?: PopUp;

  constructor(parent?: HTMLElement) {
    super(parent, 'section', 'garage');
    this.render();
  }

  startObserve(): void {
    if (!this.inputsField) throw new Error("There's no render elements");
    this.inputsField.renderBtn.createBtn.getNode().onclick = () => {
      const newCar = this.inputsField?.getInputsValue();
      if (!newCar?.name) throw new Error("There's no new car");
      createCar(newCar).then(async () => {
        await store.getValues();
        store.createInputNameValue = '';
        store.createInputColorValue = '#000000';
        this.render();
      });
    };

    this.inputsField.renderBtn.updateBtn.getNode().onclick = () => {
      const updatedCar = this.inputsField?.getUpdatedValue();
      if (store.selectedCar?.id && updatedCar) {
        updateCar(store.selectedCar?.id, updatedCar).then(async () => {
          await store.getValues();
          store.selectedCar = null;
          this.render();
        });
      }
    };

    this.createRandomCars();
    this.pageHandler();
    this.handleRaceBtn();
    this.handleResetBtn();
  }

  handleRaceBtn(): void {
    if (!this.inputsField) throw new Error("There's no render elements");
    this.inputsField.raceBtn.getNode().onclick = async () => {
      let flag = false;
      this.disableBtns();
      Promise.all(store.cars.map(car => startEngine(car.id || 0))).then(() => {
        if (this.inputsField) disableBtn([this.inputsField.raceBtn.getNode()]);
        Promise.all(
          store.cars.map(car =>
            startDriving(car.id || 0)
              .then(state => {
                const winTime = state.animationTime / msInSecond;
                if (state.success && !flag) {
                  if (this.inputsField)
                    enableBtn([this.inputsField.resetBtn.getNode()]);
                  const winnerCar = store.cars.find(c => c.id === state.id);
                  let winner = store.winners.find(c => c.id === state.id);
                  if (!winner && winnerCar?.id) {
                    winner = {
                      id: winnerCar.id,
                      wins: 1,
                      time: winTime,
                    };
                    createWinner(winner).then(() => {
                      store.getValues();
                    });
                  } else if (winner) {
                    winner.wins++;
                    if (winner.time > winTime) winner.time = winTime;
                    updateWinner(winner).then(() => {
                      store.getValues();
                    });
                  }
                  flag = true;
                  if (this.popup) {
                    const timeActivePopup = 3000;
                    this.popup.getNode().innerText = `${winnerCar?.name} won with ${winTime}s`;
                    this.popup.getNode().style.display = 'flex';
                    setTimeout(() => {
                      if (this.popup)
                        this.popup.getNode().style.display = 'none';
                    }, timeActivePopup);
                  }
                }
                return state.success;
              })
              .catch(() => {}),
          ),
        ).then(states => {
          if (this.inputsField && states.every(state => state === false)) {
            enableBtn([this.inputsField.resetBtn.getNode()]);
            if (this.popup) {
              const timeActivePopup = 3000;
              this.popup.getNode().innerText = `All cars are broken`;
              this.popup.getNode().style.display = 'flex';
              setTimeout(() => {
                if (this.popup) this.popup.getNode().style.display = 'none';
              }, timeActivePopup);
            }
          }
        });
      });
    };
  }

  handleResetBtn(): void {
    if (!this.inputsField) throw new Error("There's no render elements");
    this.inputsField.resetBtn.getNode().onclick = () => {
      Promise.all(
        store.cars.map(async car => {
          await stopDriving(car.id || 0);
        }),
      ).then(() => {
        if (this.inputsField) disableBtn([this.inputsField.resetBtn.getNode()]);
        this.enableBtns();
      });
    };
  }

  render(): void {
    this.node.innerHTML = '';
    this.inputsField = new InputsField(this.node, 'div', 'garage__inputs');
    this.inputsField.watchInputs();
    this.title = new Control(
      undefined,
      'h2',
      'garage__title',
      `garage(${store.carsCount})`,
    );
    this.pages = new PagesContainer('garage', store.garagePage);

    this.carsField = new CarsField(
      undefined,
      'garage__cars-field',
      (car: ICar) => {
        if (car.id) {
          store.selectedCar = car;
          this.inputsField?.handleUpdateInputs(car);
        }
      },
      (car: ICar) => {
        if (car.id) {
          deleteCar(car.id).then(async () => {
            if (car.id) await deleteWinner(car.id);
            await store.getValues();
            this.render();
          });
        }
      },
    );
    this.startObserve();

    this.wrapper = new ControlArray(
      'div',
      'garage__container',
      [this.title, this.pages, this.carsField],
      this.node,
    );
    this.popup = new PopUp(this.node);
  }

  pageHandler(): void {
    if (!this.pages) throw new Error("There's no more pages");
    this.pages.nextBtn.getNode().onclick = () => {
      if (store.garagePage * store.maxCarsOnPage < store.carsCount) {
        store.garagePage++;
        store.getValues().then(() => this.render());
      }
    };
    this.pages.prevBtn.getNode().onclick = () => {
      if (store.garagePage - 1 >= 1) {
        store.garagePage--;
        store.getValues().then(() => this.render());
      }
    };
  }

  createRandomCars(): void {
    if (!this.inputsField) throw new Error("There's no render elements");
    this.inputsField.createRandom.getNode().onclick = async () => {
      const randomCars = generateRandomCars();
      randomCars.forEach(el => createCar(el));
      await store.getValues();
      this.render();
    };
  }

  disableBtns(): void {
    if (!this.pages || !this.inputsField) return;
    document.querySelectorAll('.car__btn').forEach(el => disableBtn([el]));
    disableBtn([
      this.pages.nextBtn.getNode(),
      this.pages.prevBtn.getNode(),
      this.inputsField.raceBtn.getNode(),
      this.inputsField.createRandom.getNode(),
      this.inputsField.resetBtn.getNode(),
      this.inputsField.createInput.getNode(),
      this.inputsField.updateInput.getNode(),
    ]);
  }

  enableBtns(): void {
    if (!this.pages || !this.inputsField) return;
    document
      .querySelectorAll('.car__btn')
      .forEach(el => (el.classList.contains('reset') ? el : enableBtn([el])));
    enableBtn([
      this.pages.nextBtn.getNode(),
      this.pages.prevBtn.getNode(),
      this.inputsField.raceBtn.getNode(),
      this.inputsField.createRandom.getNode(),
      this.inputsField.createInput.getNode(),
      this.inputsField.updateInput.getNode(),
    ]);
  }
}
