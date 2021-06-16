export interface IGetCarsResponse {
  items: Array<ICar>;
  count: number;
}

export interface IGetWinnersResponse {
  items: Array<IWinner>;
  count: number;
}

export interface IGetEngineResponse {
  velocity: number;
  distance: number;
}

export interface IGetDriveResponse {
  success: boolean | Array<ICar>;
}

export interface ICar {
  name: string;
  color: string;
  id?: number;
}

export interface IWinner {
  id: number;
  wins: number;
  time: number;
}
