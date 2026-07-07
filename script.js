const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
const productsGrid = document.getElementById('productsGrid');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const clearCart = document.getElementById('clearCart');
const contactForm = document.getElementById('contactForm');

const products = [
  {
    id: 1,
    name: 'Polo Lacoste Classic',
    category: 'polos',
    price: 399.9,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 2,
    name: 'Polo Slim Fit',
    category: 'polos',
    price: 429.9,
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 3,
    name: 'Camiseta Casual',
    category: 'camisetas',
    price: 249.9,
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 4,
    name: 'Jaqueta Premium',
    category: 'jaquetas',
    price: 799.9,
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 5,
    name: 'Boné Signature',
    category: 'acessorios',
    price: 189.9,
    image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 6,
    name: 'Moletom Essential',
    category: 'jaquetas',
    price: 549.9,
    image: 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 7,
    name: 'Camiseta Logo',
    category: 'camisetas',
    price: 229.9,
    image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 8,
    name: 'Bolsa Sport',
    category: 'acessorios',
    price: 329.9,
    image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&w=900&q=80'
  }
];

let cart = [];

function formatBRL(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function renderProducts(filter = 'all') {
  const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);

  productsGrid.innerHTML = filtered.map(product => `
    <article class="product-card">
      <img src="${product.image}" alt="${product.name}">
      <div class="product-info">
        <h3>${product.name}</h3>
        <p>${product.category}</p>
        <span class="price">${formatBRL(product.price)}</span>
        <button class="btn btn-primary" onclick="addToCart(${product.id})">Adicionar ao carrinho</button>
      </div>
    </article>
  `).join('');
}

function updateCart() {
  if (cart.length === 0) {
    cartItems.innerHTML = '<p>Nenhum item no carrinho.</p>';
    cartTotal.textContent = formatBRL(0);
    return;
  }

  let total = 0;

  cartItems.innerHTML = cart.map(item => {
    total += item.price;
    return `
      <div class="cart-item">
        <span>${item.name}</span>
        <strong>${formatBRL(item.price)}</strong>
      </div>
    `;
  }).join('');

  cartTotal.textContent = formatBRL(total);
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  updateCart();
}

window.addToCart = addToCart;

document.querySelectorAll('.filter').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProducts(btn.dataset.filter);
  });
});

menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

clearCart.addEventListener('click', () => {
  cart = [];
  updateCart();
});

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Pedido enviado com sucesso!');
  contactForm.reset();
});

renderProducts();
updateCart();