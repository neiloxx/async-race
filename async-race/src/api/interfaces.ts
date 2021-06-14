export interface IGetCarsResponse {
  items: Array<ICar>;
  count: number;
}

export interface ICar {
  name: string;
  color: string;
  id?: number;
}
