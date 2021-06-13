export interface GetCarsResponse {
  items: Array<Car>;
  count: number;
}

export interface Car {
  name: string;
  id: number;
  color: string;
}
