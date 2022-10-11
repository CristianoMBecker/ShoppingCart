require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('should return a function', () => {
    expect(typeof fetchProducts).toBe('function');
  });
  it('should call fetch with the function fetchProducts', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  it('should return an object json equal to computadorSearch', async () => {
    const expected = await fetchProducts('computador');
    expect(computadorSearch).toEqual(expected);
  })
  it('should throw an error if there are no parameters', () => {
    expect(fetchProducts()).rejects.toThrow(/^You must provide an url$/);
  })
});
