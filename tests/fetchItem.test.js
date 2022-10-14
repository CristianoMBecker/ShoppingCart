require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('should be a function', () => {
    expect(typeof fetchItem).toBe('function');
  });
  it('should call fetch', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });
  it('should return a json obj equal to item', async () => {
    const expected = await fetchItem('MLB1615760527');
    expect(item).toEqual(expected);
  });
  it('should return a error', () => {
    expect(fetchItem()).rejects.toThrow(/^You must provide an url$/);
  })
});
