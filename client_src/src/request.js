import {apiBaseUrl} from "./properties";

const request = (method, relativeUrl, opts) => {
  let options = {
    credentials: 'include',
    method: method,
    ...opts
  };

  if (options.body) {
    if (typeof options.body === 'object') {
      options.headers = {
        'content-type': 'application/json'
      };
      options.body = JSON.stringify(options.body);
    }
  }

  return fetch(apiBaseUrl + relativeUrl, options)
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
