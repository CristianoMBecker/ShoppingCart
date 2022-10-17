// Esse tipo de comentário que estão antes de todas as funções são chamados de JSdoc,
// experimente passar o mouse sobre o nome das funções e verá que elas possuem descrições! 

// Fique a vontade para modificar o código já escrito e criar suas próprias funções!

/**
 * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
 */
const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const cart = document.querySelector('.cart__items');

const saveLocal = () => {
  const allItems = [];
  const savedItems = document.querySelectorAll('.insideCart');
  savedItems.forEach((pc) => {
    const pcDivided = pc.innerText.split(' | ');
    const dados = Object.values(pcDivided).map((dado) => dado
    .replace('ID: ', '')
    .replace('TITLE: ', '')
    .replace('PRICE: $', ''));
      allItems.push({
        id: dados[0],
        title: dados[1],
        price: dados[2],
      });
    });
  saveCartItems(JSON.stringify(allItems));
};

/**
 * Função responsável por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento.
 * @returns {Element} Elemento criado.
 */
const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

/**
 * Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto. 
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @returns {Element} Elemento de produto.
 */
const createProductItemElement = ({ id, title, thumbnail }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

/**
 * Função que recupera o ID do produto passado como parâmetro.
 * @param {Element} product - Elemento do produto.
 * @returns {string} ID do produto.
 */
const getIdFromProductItem = (product) => product.querySelector('span.id').innerText;

const cartItemClickListener = (li) => {
  cart.removeChild(li);
};

/**
 * Função responsável por criar e retornar um item do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @returns {Element} Elemento de um item do carrinho.
 */
const createCartItemElement = ({ id, title, price }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.classList.add('insideCart');
  li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  li.addEventListener('click', () => {
    cartItemClickListener(li);
  });
    cart.appendChild(li);
    saveLocal();
};

const items = document.querySelector('.items');

const rescueLocal = () => {
  if (!localStorage.getItem('cartItem')) return;

  const saved = JSON.parse(getSavedCartItems());
  saved.forEach((savedPC) => createCartItemElement(savedPC));
};

const shoppingCart = async () => {
  rescueLocal();
  const { results } = await fetchProducts('computador');
  results.forEach((pc) => {
    items.appendChild(createProductItemElement(pc));
  });
  const botoes = document.querySelectorAll('.item__add');
  botoes.forEach((btt, index) => {
    btt.addEventListener('click', () => {
      createCartItemElement(results[index]);
    });
  });
};

const cleaner = document.querySelector('.empty-cart');
cleaner.addEventListener('click', () => {
  cart.innerText = '';
  localStorage.clear();
});

window.onload = () => {
  shoppingCart();
};
