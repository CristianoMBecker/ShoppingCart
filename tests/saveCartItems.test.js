const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  it('should call localStorage.setItem', () => {
    saveCartItems('compuiter');
    expect(localStorage.setItem).toHaveBeenCalled();
  });
  it('should call localStorage.setItem to be called with the right parameters', () => {
    saveCartItems('compuiter');
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItem', 'compuiter');
  })
});
