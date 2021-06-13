import { get } from './fetcher';
import routes from './routes';
import { IGetCarsResponse } from './interfaces';

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
