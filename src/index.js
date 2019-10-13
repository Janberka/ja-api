import fetch from 'isomorphic-fetch';

const json = r => r.json().then(json => {
  if (json.error) {
    throw Error(json.error);
  }

  return json;
});

const api = ({ host }) => {
  const apiUrl = `${host}/api/`;

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
  
  const get = url => myFetch(url);
  
  const remove = url => myFetch(url, {method: 'DELETE'});
  
  const post = (url, data) => {
    const body = JSON.stringify(data);
    return myFetch(url, {
      method: 'POST',
      body
    });
  };
  
  const put = (url, data) => {
    const body = JSON.stringify(data);
    return myFetch(url), {
      method: 'PUT',
      body
    };
  };
  
  return { get, post, remove, put };
};

export default api;
