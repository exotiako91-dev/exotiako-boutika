const grid = document.getElementById("productsGrid");
const cartPanel = document.getElementById("cartPanel");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const modal = document.getElementById("productModal");
const modalContent = document.getElementById("modalContent");
const sellerEmail = "votre-email@example.com";

let cart = JSON.parse(localStorage.getItem("exotiako_cart")) || [];
let currentCategory = "all";

const euro = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" });

function saveCart() {
  localStorage.setItem("exotiako_cart", JSON.stringify(cart));
  renderCart();
}

function getCartQuantity(productId) {
  const item = cart.find((entry) => entry.id === productId);
  return item ? item.quantity : 0;
}

function addToCart(productId, quantity = 1) {
  const product = PRODUCTS.find((item) => item.id === productId);
  if (!product) return;
  const existing = cart.find((item) => item.id === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ id: product.id, quantity });
  }
  saveCart();
  openCart();
}

function updateQuantity(productId, quantity) {
  if (quantity <= 0) {
    cart = cart.filter((item) => item.id !== productId);
  } else {
    const item = cart.find((entry) => entry.id === productId);
    if (item) item.quantity = quantity;
  }
  saveCart();
}

function renderProducts() {
  const products = currentCategory === "all" ? PRODUCTS : PRODUCTS.filter((item) => item.category === currentCategory);
  grid.innerHTML = products.map((product) => `
    <article class="product-card">
      <button class="image-button" type="button" onclick="openProduct('${product.id}')" aria-label="Voir ${product.name}">
        <img src="${product.image}" alt="${product.name}" loading="lazy" />
      </button>
      <div class="product-content">
        <span class="tag">${labelCategory(product.category)}</span>
        <h3>${product.name}</h3>
        <p>${product.short}</p>
        <div class="product-bottom">
          <strong>${euro.format(product.price)}</strong>
          <span>/${product.unit}</span>
        </div>
        <div class="product-actions">
          <button type="button" class="details-btn" onclick="openProduct('${product.id}')">Détail</button>
          <button type="button" class="add-btn" onclick="addToCart('${product.id}', 1)">Ajouter</button>
        </div>
      </div>
    </article>
  `).join("");
}

function labelCategory(category) {
  if (category === "boisson") return "Boisson";
  if (category === "vegan") return "Vegan";
  return "Salé";
}

function renderCart() {
  const detailedItems = cart.map((item) => ({ ...PRODUCTS.find((p) => p.id === item.id), quantity: item.quantity })).filter(Boolean);
  const totalItems = detailedItems.reduce((sum, item) => sum + item.quantity, 0);
  const total = detailedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  cartCount.textContent = totalItems;
  cartTotal.textContent = euro.format(total);

  if (detailedItems.length === 0) {
    cartItems.innerHTML = `<div class="empty-cart">Votre panier est vide. Ajoutez quelques spécialités exotiques.</div>`;
    return;
  }

  cartItems.innerHTML = detailedItems.map((item) => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" />
      <div>
        <strong>${item.name}</strong>
        <span>${euro.format(item.price)} / ${item.unit}</span>
        <div class="qty-controls">
          <button type="button" onclick="updateQuantity('${item.id}', ${item.quantity - 1})">−</button>
          <span>${item.quantity}</span>
          <button type="button" onclick="updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
        </div>
      </div>
      <button class="remove-btn" type="button" onclick="updateQuantity('${item.id}', 0)">×</button>
    </div>
  `).join("");
}

function openProduct(productId) {
  const product = PRODUCTS.find((item) => item.id === productId);
  if (!product) return;
  modalContent.innerHTML = `
    <div class="modal-grid">
      <img src="${product.image}" alt="${product.name}" />
      <div>
        <span class="tag">${labelCategory(product.category)}</span>
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <strong class="modal-price">${euro.format(product.price)} / ${product.unit}</strong>
        <div class="modal-order">
          <label for="modalQty">Quantité</label>
          <input id="modalQty" type="number" min="1" value="1" />
          <button type="button" onclick="addModalProduct('${product.id}')">Ajouter au panier</button>
        </div>
        <p class="already">Dans votre panier : ${getCartQuantity(product.id)}</p>
      </div>
    </div>
  `;
  modal.showModal();
}

function addModalProduct(productId) {
  const qty = Math.max(1, Number(document.getElementById("modalQty").value || 1));
  addToCart(productId, qty);
  modal.close();
}

function openCart() {
  cartPanel.classList.add("open");
  cartPanel.setAttribute("aria-hidden", "false");
}

function closeCart() {
  cartPanel.classList.remove("open");
  cartPanel.setAttribute("aria-hidden", "true");
}

function checkout() {
  if (cart.length === 0) {
    alert("Votre panier est vide.");
    return;
  }
  const detailedItems = cart.map((item) => ({ ...PRODUCTS.find((p) => p.id === item.id), quantity: item.quantity })).filter(Boolean);
  const total = detailedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const lines = detailedItems.map((item) => `- ${item.name} x ${item.quantity} = ${euro.format(item.price * item.quantity)}`).join("%0D%0A");
  const subject = encodeURIComponent("Commande ExoTiako");
  const body = `Bonjour,%0D%0A%0D%0AJe souhaite passer la commande suivante :%0D%0A%0D%0A${lines}%0D%0A%0D%0ATotal estimé : ${encodeURIComponent(euro.format(total))}%0D%0A%0D%0AMes coordonnées :%0D%0ANom : %0D%0ATéléphone : %0D%0AAdresse / retrait : %0D%0A%0D%0AMerci.`;
  window.location.href = `mailto:${sellerEmail}?subject=${subject}&body=${body}`;
}

document.querySelectorAll(".filter").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    currentCategory = button.dataset.category;
    renderProducts();
  });
});

document.getElementById("openCartBtn").addEventListener("click", openCart);
document.getElementById("openCartBtnHero").addEventListener("click", openCart);
document.getElementById("closeCartBtn").addEventListener("click", closeCart);
document.getElementById("closeCartBackdrop").addEventListener("click", closeCart);
document.getElementById("checkoutBtn").addEventListener("click", checkout);
document.getElementById("clearCartBtn").addEventListener("click", () => {
  cart = [];
  saveCart();
});
document.getElementById("closeModalBtn").addEventListener("click", () => modal.close());

renderProducts();
renderCart();
