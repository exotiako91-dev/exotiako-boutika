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

function getProduct(productId) {
  return PRODUCTS.find((item) => item.id === productId);
}

function getVariant(product, variantId) {
  if (!product?.variants?.length) return null;
  return product.variants.find((variant) => variant.id === variantId) || product.variants[0];
}

function getCartKey(productId, variantId = "standard") {
  return `${productId}__${variantId}`;
}

function getCartQuantity(productId, variantId = "standard") {
  const item = cart.find((entry) => entry.key === getCartKey(productId, variantId));
  return item ? item.quantity : 0;
}

function addToCart(productId, quantity = 1, variantId = "standard") {
  const product = getProduct(productId);
  if (!product) return;
  const variant = getVariant(product, variantId);
  const safeVariantId = variant ? variant.id : "standard";
  const key = getCartKey(product.id, safeVariantId);
  const existing = cart.find((item) => item.key === key);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ key, id: product.id, variantId: safeVariantId, quantity });
  }

  saveCart();
  openCart();
}

function updateQuantity(key, quantity) {
  if (quantity <= 0) {
    cart = cart.filter((item) => item.key !== key);
  } else {
    const item = cart.find((entry) => entry.key === key);
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
          <strong>${priceLabel(product)}</strong>
          <span>/${product.unit}</span>
        </div>
        ${product.variants?.length ? `<p class="variant-note">Choix : végétarien, poisson, poulet ou viande</p>` : ""}
        <div class="product-actions">
          <button type="button" class="details-btn" onclick="openProduct('${product.id}')">Détail</button>
          ${product.variants?.length
            ? `<button type="button" class="add-btn" onclick="openProduct('${product.id}')">Choisir</button>`
            : `<button type="button" class="add-btn" onclick="addToCart('${product.id}', 1)">Ajouter</button>`}
        </div>
      </div>
    </article>
  `).join("");
}

function priceLabel(product) {
  if (product.variants?.length) {
    const min = Math.min(...product.variants.map((variant) => variant.price));
    return `Dès ${euro.format(min)}`;
  }
  return euro.format(product.price);
}

function labelCategory(category) {
  if (category === "boisson") return "Boisson";
  if (category === "vegan") return "Vegan";
  return "Salé";
}

function detailedCartItems() {
  return cart.map((item) => {
    const product = getProduct(item.id);
    if (!product) return null;
    const variant = getVariant(product, item.variantId);
    return {
      ...item,
      product,
      displayName: variant ? `${product.name} ${variant.name}` : product.name,
      price: variant ? variant.price : product.price,
      image: variant ? variant.image : product.image,
      unit: product.unit,
      variantName: variant ? variant.name : ""
    };
  }).filter(Boolean);
}

function renderCart() {
  const items = detailedCartItems();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  cartCount.textContent = totalItems;
  cartTotal.textContent = euro.format(total);

  if (items.length === 0) {
    cartItems.innerHTML = `<div class="empty-cart">Votre panier est vide. Ajoutez quelques spécialités exotiques.</div>`;
    return;
  }

  cartItems.innerHTML = items.map((item) => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.displayName}" />
      <div>
        <strong>${item.displayName}</strong>
        <span>${euro.format(item.price)} / ${item.unit}</span>
        <div class="qty-controls">
          <button type="button" onclick="updateQuantity('${item.key}', ${item.quantity - 1})">−</button>
          <span>${item.quantity}</span>
          <button type="button" onclick="updateQuantity('${item.key}', ${item.quantity + 1})">+</button>
        </div>
      </div>
      <button class="remove-btn" type="button" onclick="updateQuantity('${item.key}', 0)">×</button>
    </div>
  `).join("");
}

function openProduct(productId) {
  const product = getProduct(productId);
  if (!product) return;
  const hasVariants = product.variants?.length;
  modalContent.innerHTML = `
    <div class="modal-grid">
      <img id="modalProductImage" src="${product.image}" alt="${product.name}" />
      <div>
        <span class="tag">${labelCategory(product.category)}</span>
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        ${hasVariants ? renderVariantSelector(product) : ""}
        <strong class="modal-price" id="modalPrice">${hasVariants ? euro.format(product.variants[0].price) : `${euro.format(product.price)} / ${product.unit}`}</strong>
        <div class="modal-order">
          <label for="modalQty">Quantité</label>
          <input id="modalQty" type="number" min="1" value="1" />
          <button type="button" onclick="addModalProduct('${product.id}')">Ajouter au panier</button>
        </div>
        <p class="already" id="alreadyInfo">Dans votre panier : ${hasVariants ? getCartQuantity(product.id, product.variants[0].id) : getCartQuantity(product.id)}</p>
      </div>
    </div>
  `;
  modal.showModal();
}

function renderVariantSelector(product) {
  return `
    <div class="variant-box">
      <label for="variantSelect">Choisir la garniture</label>
      <select id="variantSelect" onchange="changeVariant('${product.id}')">
        ${product.variants.map((variant) => `<option value="${variant.id}">${variant.name} — ${euro.format(variant.price)}</option>`).join("")}
      </select>
    </div>
  `;
}

function changeVariant(productId) {
  const product = getProduct(productId);
  const selected = document.getElementById("variantSelect")?.value;
  const variant = getVariant(product, selected);
  if (!variant) return;
  document.getElementById("modalProductImage").src = variant.image;
  document.getElementById("modalProductImage").alt = `${product.name} ${variant.name}`;
  document.getElementById("modalPrice").textContent = `${euro.format(variant.price)} / ${product.unit}`;
  document.getElementById("alreadyInfo").textContent = `Dans votre panier : ${getCartQuantity(product.id, variant.id)}`;
}

function addModalProduct(productId) {
  const product = getProduct(productId);
  const selectedVariant = document.getElementById("variantSelect")?.value || "standard";
  const qty = Math.max(1, Number(document.getElementById("modalQty").value || 1));
  addToCart(productId, qty, selectedVariant);
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
  const items = detailedCartItems();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const lines = items.map((item) => `- ${item.displayName} x ${item.quantity} = ${euro.format(item.price * item.quantity)}`).join("%0D%0A");
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
