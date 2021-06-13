export interface IGetCarsResponse {
  items: Array<ICar>;
  count: number;
}

export interface ICar {
  name: string;
  id: number;
  color: string;
}
