const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  it('should call localStorage.setItem', () => {
    saveCartItems();
    expect(localStorage.setItem).toHaveBeenCalled();
  });
});
