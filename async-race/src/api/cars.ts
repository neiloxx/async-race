import { del, get, post, put } from './fetcher';
import routes from './routes';
import {
  ICar,
  IGetCarsResponse,
  IGetDriveResponse,
  IGetEngineResponse,
  IGetWinnersResponse,
  IWinner,
} from './interfaces';

export const maxCarsOnPage = 7;
export const maxWinnersOnPage = 10;
const successfulStatus = 200;

export const getCars = async (
  page: number,
  limit: number = maxCarsOnPage,
): Promise<IGetCarsResponse> => {
  return get(`${routes.garage}?_page=${page}&_limit=${limit}`).then(
    async res => {
      return {
        items: await res.json(),
        count: +(res.headers.get('X-Total-Count') || 0),
      };
    },
  );
};

export const updateCar = async (id: number, body: ICar): Promise<void> => {
  await put(`${routes.garage}/${id}`, body);
};

export const getCar = async (id: number): Promise<ICar> => {
  const response = await fetch(`${routes.garage}/${id}`);
  return response.json();
};

export const createCar = async (body: ICar): Promise<void> => {
  await post(`${routes.garage}`, body);
};

export const deleteCar = async (id: number): Promise<void> => {
  await del(`${routes.garage}/${id}`);
};

export const deleteWinner = async (id: number): Promise<void> => {
  await del(`${routes.winners}/${id}`);
};

export const getSortOrder = (sort: string, order: string) => {
  return sort && order ? `&_sort=${sort}&_order=${order}` : '';
};

export const createWinner = async (winner: IWinner): Promise<Response> => {
  return post(`${routes.winners}`, winner).then(async res => {
    return res;
  });
};

export const updateWinner = async (winner: IWinner): Promise<Response> => {
  return put(`${routes.winners}/${winner.id}`, winner).then(async res => {
    return res;
  });
};

export const getWinners = async (
  page: number,
  limit: number = maxWinnersOnPage,
  sort: string,
  order: string,
): Promise<IGetWinnersResponse> => {
  return get(
    `${routes.winners}?_page=${page}&_limit=${limit}${getSortOrder(
      sort,
      order,
    )}`,
  ).then(async res => {
    return {
      items: await res.json(),
      count: +(res.headers.get('X-Total-Count') || 0),
    };
  });
};

export const startEngine = async (id: number): Promise<IGetEngineResponse> => {
  const response = await fetch(`${routes.engine}?id=${id}&status=started`);
  return response.json();
};

export const stopEngine = async (id: number): Promise<IGetEngineResponse> => {
  const response = await fetch(`${routes.engine}?id=${id}&status=stopped`);
  return response.json();
};

export const drive = async (id: number): Promise<IGetDriveResponse> => {
  const response = await fetch(
    `${routes.engine}?id=${id}&status=drive`,
  ).catch();
  return response.status !== successfulStatus
    ? { success: false }
    : { ...(await response.json()) };
};
