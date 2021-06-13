const successfulResponsesMin = 200;
const successfulResponsesMax = 300;

export const checkStatus = (response: Response): Response => {
  if (
    response.status >= successfulResponsesMin &&
    response.status < successfulResponsesMax
  ) {
    return response;
  }
  throw new Error(response.statusText);
};

export const get = (url: string): Promise<Response> => {
  return fetch(url, {
    method: 'GET',
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }),
  }).then(response => {
    checkStatus(response);
    return response;
  });
};

export const del = (url: string): Promise<Response> => {
  return fetch(url, {
    method: 'DELETE',
  }).then(response => {
    checkStatus(response);
    return response;
  });
};

export const patch = (url: string) => {
  return fetch(url, {
    method: 'PATCH',
  }).then(response => {
    checkStatus(response);
    return response;
  });
};

export const post = (url: string, body: Response): Promise<Response> => {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  }).then(response => {
    checkStatus(response);
    return response;
  });
};
