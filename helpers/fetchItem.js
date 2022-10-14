const getUrlItem = (id) => `https://api.mercadolibre.com/items/${id}`;

const fetchItem = async (id) => {
  if (id === undefined || id === '') {
    throw new Error('You must provide an url');
  }
  const data = await fetch(getUrlItem(id));
  const response = await data.json();
  return response;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
