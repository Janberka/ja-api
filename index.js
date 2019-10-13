import fetch from 'isomorphic-fetch';
import conf from '../../conf';

const json = r => r.json().then(json => {
  if (json.error) {
    throw Error(json.error);
  }

  return json;
});

export const apiUrl = `${conf.api.host}/api/`;

const getUrl = url => `${apiUrl}${url}`;

const getOpts = (opts = {}) => {
  const { token = global.token } = opts;

  if (token) {
    if (!opts.headers) {
      opts.headers = {};
    }

    opts.headers.auth = token;
  }

  if (opts.headers) {
    opts.headers = new Headers(opts.headers);
  }

  return opts;
};

const myFetch = (url, opts) => fetch(getUrl(url), getOpts(opts)).then(json);

export const get = url => myFetch(url);

export const remove = url => myFetch(url, {method: 'DELETE'});

export const post = (url, data) => {
  const body = JSON.stringify(data);
  return myFetch(url, {
    method: 'POST',
    body
  });
};

export const put = (url, data) => {
  const body = JSON.stringify(data);
  return myFetch(url), {
    method: 'PUT',
    body
  };
};
