const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const cart = document.querySelector('.cart__items');

const somar = (pricePc, prices) => {
  const price = document.querySelector('.total-price');
  prices.push(pricePc);
  const sum = prices.reduce((total, amount) => total + amount);
  price.innerText = `$${sum.toFixed(2)}`;
};

const CalculatePrice = async () => {
  const prices = [];
  const carrinho = document.querySelectorAll('.insideCart');
  carrinho.forEach((product) => {
    const splitted = product.innerText.split('|');
    const doestnmatter = Object.values(splitted);
    const pcPrices = doestnmatter[2];
    const pricePc = parseFloat(pcPrices.replace('PRICE: $', ''));
    somar(pricePc, prices);
  });
};

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

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ id, title, thumbnail }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const cartItemClickListener = (li) => {
  cart.removeChild(li);
  CalculatePrice();
};

const createCartItemElement = ({ id, title, price }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.classList.add('insideCart');
  li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  li.addEventListener('click', () => {
    cartItemClickListener(li);
    saveLocal();
  });
    cart.appendChild(li);
    saveLocal();
};

const items = document.querySelector('.items');

const rescueLocal = () => {
  if (!localStorage.getItem('cartItem')) return;

  const saved = JSON.parse(getSavedCartItems());
  saved.forEach((savedPC) => createCartItemElement(savedPC));
  CalculatePrice();
};

const loading = () => {
  const wait = document.createElement('h1');
  wait.innerText = 'Carregando...';
  wait.classList = 'loading';
  return wait;
};

const shoppingCart = async () => {
  rescueLocal();
  items.appendChild(loading());
  const { results } = await fetchProducts('computador');
  results.forEach((pc) => {
    items.appendChild(createProductItemElement(pc));
  });
  const deleteLoading = document.querySelector('.loading');
  items.removeChild(deleteLoading);
  const botoes = document.querySelectorAll('.item__add');
  botoes.forEach((btt, index) => {
    btt.addEventListener('click', () => {
      createCartItemElement(results[index]);
      CalculatePrice();
    });
  });
};

const cleaner = document.querySelector('.empty-cart');
cleaner.addEventListener('click', () => {
  cart.innerText = '';
  localStorage.clear();
  const price = document.querySelector('.total-price');
  price.innerText = '';
});

window.onload = () => {
  shoppingCart();
};
