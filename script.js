// List of games with image, title, price, and description
const games = [
  {
    title: "Outer Expanse",
    price: 29.99,
    img: "images/OuterExpanse.png",
    description: "Explore the vastness of the far lands in this open-world exploration game"
  },
  {
    title: "Gunslinger",
    price: 34.99,
    img: "images/Gunslinger.png",
    description: "Go up against your friends in a 3D movement FPS with fast-paced action"
  },
  {
    title: "Elemental combat",
    price: 24.50,
    img: "images/ElementalCombat.png",
    description: "A 2D top down fighitng game with powerful elemental abilities and combos"
  },
  {
    title: "Elatrednu",
    price: 39.99,
    img: "images/Elatrednu.png",
    description: "A game"
  }
];

let cart = [];

const cartBtn = document.getElementById('cartBtn');
const cartCount = document.getElementById('cartCount');
const cartDropdown = document.getElementById('cartDropdown');
const gamesGrid = document.getElementById('gamesGrid');
const searchBar = document.getElementById('searchBar');

// setup game list
function renderGames(filter = '') {
  const filtered = games.filter(g =>
    g.title.toLowerCase().includes(filter.toLowerCase())
  );
  if (filtered.length === 0) {
    gamesGrid.innerHTML = '<p>No games found.</p>';
    return;
  }
  gamesGrid.innerHTML = filtered.map((game, index) => `
    <div class="game-card" data-index="${games.indexOf(game)}">
      <img src="${game.img}" alt="${game.title} cover" />
      <div class="game-info">
        <div class="game-title">${game.title}</div>
        <div class="game-price">$${game.price.toFixed(2)}</div>
        <div class="game-desc">${game.description}</div>
      </div>
      <button class="add-btn" data-index="${games.indexOf(game)}">Add to Cart</button>
    </div>
  `).join('');
}


// update cart display
function updateCart() {
  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
  cartCount.textContent = totalCount;

  if (cart.length === 0) {
    cartDropdown.innerHTML = '<p>Your cart is empty</p>';
  } else {
    cartDropdown.innerHTML = cart.map(item =>
      `<p>${item.title} x${item.qty} - $${(item.price * item.qty).toFixed(2)}</p>`
    ).join('') +
    `<p><strong>Total: $${cart.reduce((sum,item) => sum + item.price * item.qty,0).toFixed(2)}</strong></p>`;
  }
}

// game add to cart
function addToCart(index) {
  const game = games[index];
  const found = cart.find(item => item.title === game.title);
  if (found) {
    found.qty += 1;
  } else {
    cart.push({...game, qty: 1});
  }
  updateCart();
}

gamesGrid.addEventListener('click', e => {
  if (e.target.classList.contains('add-btn')) {
    const index = parseInt(e.target.getAttribute('data-index'), 10);
    addToCart(index);
  }
});

// search
searchBar.addEventListener('input', i => {
  renderGames(i.target.value);
});

// toggle cart
cartBtn.addEventListener('click', () => {
  cartDropdown.classList.toggle('show');
});

// close cart if clicking out
document.addEventListener('click', i => {
  if (!cartDropdown.contains(i.target) && i.target !== cartBtn) {
    cartDropdown.classList.remove('show');
  }
});

renderGames();
updateCart();