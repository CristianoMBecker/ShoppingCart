const getUrl = (pc) => `https://api.mercadolibre.com/sites/MLB/search?q=${pc}`;

const fetchProducts = async (pc) => {
  if (pc === undefined || pc === '') {
    throw new Error('You must provide an url');
  }
  const data = await fetch(getUrl(pc));
  const response = data.json();
  return response;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
