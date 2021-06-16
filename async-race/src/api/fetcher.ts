import { ICar, IWinner } from './interfaces';

export const get = (url: string): Promise<Response> => {
  return fetch(url, {
    method: 'GET',
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }),
  });
};

export const del = (url: string): Promise<Response> => {
  return fetch(url, {
    method: 'DELETE',
  });
};

export const patch = (url: string) => {
  return fetch(url, {
    method: 'PATCH',
  });
};

export const post = (url: string, body: ICar | IWinner): Promise<Response> => {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  });
};

export const put = (url: string, body: ICar | IWinner): Promise<Response> => {
  return fetch(url, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  });
};
