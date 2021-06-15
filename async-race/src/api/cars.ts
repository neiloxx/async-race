import { del, get, post, put } from './fetcher';
import routes from './routes';
import { ICar, IGetCarsResponse, IGetWinnersResponse } from './interfaces';

export const maxCarsOnPage = 7;
export const maxWinnersOnPage = 10;

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
