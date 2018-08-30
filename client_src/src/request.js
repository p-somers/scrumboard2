import { apiBaseUrl } from "./properties";

const request = (method, relativeUrl, opts) => {
    return fetch(apiBaseUrl + relativeUrl,
      {
        credentials: 'include',
        method: method,
        ...opts
      })
      .then(response => response.json())
      .then(response => {
        if (response.error) {
          return Promise.reject(response);
        }
        return response;
      });
  };

const get = request.bind(this, 'GET');
const post = request.bind(this, 'POST');

export {
  request,
  get,
  post
};
