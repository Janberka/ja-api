import { createApi } from '../src';

const api = createApi({});

describe('api functions', () => {
  it('api.get works', () => {
    expect(api.get('test')).toEqual(Promise.resolve({}));
  });
  it('api.post works', () => {
    expect(api.post('test', {})).toEqual(Promise.resolve({}));
  });
  it('api.put works', () => {
    expect(api.put('test', {})).toEqual(Promise.resolve({}));
  });
  it('api.remove works', () => {
    expect(api.remove('test')).toEqual(Promise.resolve({}));
  });
});
