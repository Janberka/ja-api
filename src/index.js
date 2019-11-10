import fetch from 'isomorphic-fetch';

const json = r => r.json().then(json => {
  if (json.error) {
    throw Error(json.error);
  }
  
  return json;
});

const createApi = ({ host, token: apiToken }) => {
  const apiUrl = `${host}/api/`;

  const getUrl = url => `${apiUrl}${url}`;

  const getOpts = (opts = {}) => {
    const { token = apiToken, headers = {} } = opts;

    if (token) {
      headers.auth = token;
    }

    opts.headers = new Headers(headers);

    return opts;
  };

  const myFetch = (rawURL, rawOpts) => {
    const url = getUrl(rawURL);
    const opts = getOpts(rawOpts);
    return fetch(url, opts).then(json)
  };

  const get = (url, opts = {}) => myFetch(url, {...opts});

  const remove = (url, opts = {}) => myFetch(url, {method: 'DELETE', ...opts});

  const post = (url, data, opts ={}) => {
    const body = JSON.stringify(data);
    return myFetch(url, {
      method: 'POST',
      body,
      ...opts
    });
  };
  
  const put = (url, data, opts = {}) => {
    const body = JSON.stringify(data);
    return myFetch(url), {
      method: 'PUT',
      body,
      ...opts
    };
  };

  return { get, post, remove, put };
}

export default createApi;
