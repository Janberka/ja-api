import { createApi } from '../src/ja-api'

const opts = {
  host: 'http://localhost:3000'
}

const catchAll = () => ({})

describe('api functions', () => {
  const api = createApi(opts)

  it('api constructs', () => {
    expect(api).toBeInstanceOf(Object)
  })
  it('api.get works', () => {
    expect(api.get('test').catch(catchAll)).toEqual(Promise.resolve({}))
  })
  it('api.post works', () => {
    expect(api.post('test', {}).catch(catchAll)).toEqual(Promise.resolve({}))
  })
  it('api.put works', () => {
    expect(api.put('test', {}).catch(catchAll)).toEqual(Promise.resolve({}))
  })
  it('api.remove works', () => {
    expect(api.remove('test').catch(catchAll)).toEqual(Promise.resolve({}))
  })
})
