import { get, post } from './fetcher';
import routes from './routes';
import { ICar, IGetCarsResponse } from './interfaces';

const maxCarsOnPage = 7;

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

export const createCar = async (body: ICar): Promise<void> => {
  await post(`${routes.garage}`, body);
};
