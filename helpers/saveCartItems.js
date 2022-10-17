const saveCartItems = (product) => localStorage.setItem('cartItem', product);

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
