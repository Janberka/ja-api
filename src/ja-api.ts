interface ApiOptions {
  fetch: Function,
  host?: string | 'http://localhost/'
  token?: string | null
}

interface RawOptions {
  method?: string | 'GET'
  body?: string
  headers?: object
}

const createApi = ({ fetch, host, token: apiToken }: ApiOptions) => {
  const apiUrl = `${host}/api/`

  const getUrl = (url: string) => `${apiUrl}${url}`

  const getOpts = (opts?: RawOptions) => {
    const headers = {
      ...((opts && opts.headers) || {}),
      ...(apiToken ? { auth: apiToken } : {})
    }

    return { ...opts, headers }
  }

  const myFetch = (rawURL: string, rawOpts?: RawOptions) => {
    const url = getUrl(rawURL)
    const opts = getOpts(rawOpts)
    return fetch(url, opts).then((r: Request) => r.json())
  }

  const get = (url: string) => myFetch(url)

  const remove = (url: string) => myFetch(url, { method: 'DELETE' })

  const post = (url: string, data: object) => {
    const body = JSON.stringify(data)
    return myFetch(url, {
      method: 'POST',
      body
    })
  }

  const put = (url: string, data: object) => {
    const body = JSON.stringify(data)
    return myFetch(url, {
      method: 'PUT',
      body
    })
  }

  return { get, post, remove, put }
}

export default createApi
