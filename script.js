const products = [
  {id:'bissap', name:'Jus de bissap', category:'Boisson', description:'Boisson fraîche à l’hibiscus, douce et parfumée.', price:3.50, unit:'bouteille', image:'images/bissap.png'},
  {id:'beignet', name:'Beignet de légumes', category:'Salé', description:'Beignet salé, croustillant et généreux en légumes.', price:1.50, unit:'pièce', image:'images/beignet-legumes.png'},
  {id:'caca-pigeon', name:'Caca pigeon', category:'Salé', description:'Snack croustillant traditionnel, idéal à partager.', price:2.50, unit:'portion', image:'images/caca-pigeon.png'},
  {id:'sambos', name:'Sambos', category:'Salé', description:'Sambos croustillants avec plusieurs garnitures au choix.', price:1.80, unit:'pièce', image:'images/sambos.png', variants:[
    {name:'Végétarien', price:1.80}, {name:'Poisson', price:2.00}, {name:'Poulet', price:2.00}, {name:'Viande', price:2.20}
  ]},
  {id:'nems', name:'Nems', category:'Salé', description:'Nems dorés et croustillants avec plusieurs versions au choix.', price:1.70, unit:'pièce', image:'images/nems.png', variants:[
    {name:'Végétarien', price:1.70}, {name:'Poisson', price:1.90}, {name:'Poulet', price:1.90}, {name:'Viande', price:2.10}
  ]},
  {id:'piment', name:'Piment de Madagascar', category:'Épice', description:'Piments rouges séchés, puissants et parfumés. Parfait pour relever vos plats.', price:2.00, unit:'sachet (50g)', image:'images/piment-madagascar.png'}
];

let cart = JSON.parse(localStorage.getItem('exotiakoCart') || '[]');
let currentProduct = null;
let currentVariant = null;

const grid = document.getElementById('productGrid');
const modal = document.getElementById('productModal');
const modalContent = document.getElementById('modalContent');
const searchInput = document.getElementById('searchInput');

function euro(n){ return n.toLocaleString('fr-FR',{style:'currency',currency:'EUR'}); }
function saveCart(){ localStorage.setItem('exotiakoCart', JSON.stringify(cart)); renderCart(); }

function renderProducts(list = products){
  grid.innerHTML = list.map(p => `
    <article class="card">
      <img src="${p.image}" alt="${p.name}">
      <div class="card-body">
        <span class="badge">${p.category}</span>
        <h3>${p.name}</h3>
        <p class="desc">${p.description}</p>
        <div class="price">${p.variants ? 'Dès ' : ''}${euro(p.price)} <small>/${p.unit}</small></div>
        ${p.variants ? '<div class="choices">Choix : végétarien, poisson, poulet ou viande</div>' : ''}
        <div class="actions">
          <button class="btn secondary" onclick="openDetails('${p.id}')">ⓘ Détail</button>
          <button class="btn add" onclick="${p.variants ? `openDetails('${p.id}')` : `quickAdd('${p.id}')`}">${p.variants ? '☷ Choisir' : '🛒 Ajouter'}</button>
        </div>
      </div>
    </article>`).join('');
}

function quickAdd(id){
  const p = products.find(x => x.id === id);
  addToCart(p, null, 1);
}

function openDetails(id){
  currentProduct = products.find(p => p.id === id);
  currentVariant = currentProduct.variants ? currentProduct.variants[0] : null;
  modalContent.innerHTML = `
    <img src="${currentProduct.image}" alt="${currentProduct.name}">
    <div>
      <span class="badge">${currentProduct.category}</span>
      <h2>${currentProduct.name}</h2>
      <p>${currentProduct.description}</p>
      ${currentProduct.variants ? `
        <h3>Choisissez votre variante</h3>
        <div class="variant-list">
          ${currentProduct.variants.map((v,i)=>`<button class="variant ${i===0?'active':''}" onclick="selectVariant(${i})"><strong>${v.name}</strong> — ${euro(v.price)} /${currentProduct.unit}</button>`).join('')}
        </div>` : ''}
      <div class="qty"><label>Quantité</label><input id="qtyInput" type="number" min="1" value="1"></div>
      <button class="btn add" onclick="addCurrentToCart()">🛒 Ajouter au panier</button>
    </div>`;
  modal.showModal();
}

function selectVariant(index){
  currentVariant = currentProduct.variants[index];
  document.querySelectorAll('.variant').forEach((b,i)=>b.classList.toggle('active', i===index));
}

function addCurrentToCart(){
  const qty = Math.max(1, parseInt(document.getElementById('qtyInput').value || '1', 10));
  addToCart(currentProduct, currentVariant, qty);
  modal.close();
}

function addToCart(product, variant, qty){
  const key = variant ? `${product.id}-${variant.name}` : product.id;
  const price = variant ? variant.price : product.price;
  const name = variant ? `${product.name} ${variant.name}` : product.name;
  const existing = cart.find(i => i.key === key);
  if(existing){ existing.qty += qty; } else { cart.push({key, name, price, qty, unit:product.unit}); }
  saveCart();
}

function renderCart(){
  const cartItems = document.getElementById('cartItems');
  const count = cart.reduce((s,i)=>s+i.qty,0);
  const total = cart.reduce((s,i)=>s+i.qty*i.price,0);
  document.getElementById('cartCount').textContent = count;
  document.getElementById('cartTotal').textContent = euro(total);
  document.getElementById('cartTotalMini').textContent = euro(total);
  if(cart.length === 0){ cartItems.className='cart-items empty'; cartItems.textContent='Votre panier est vide.'; return; }
  cartItems.className='cart-items';
  cartItems.innerHTML = cart.map(i => `
    <div class="cart-row">
      <span><strong>${i.name}</strong><br>${i.qty} x ${euro(i.price)} /${i.unit}</span>
      <strong>${euro(i.qty*i.price)}</strong>
      <button onclick="removeItem('${i.key}')">Supprimer</button>
    </div>`).join('');
}

function removeItem(key){ cart = cart.filter(i => i.key !== key); saveCart(); }

document.getElementById('closeModal').onclick = () => modal.close();
document.getElementById('openCartBtn').onclick = () => document.getElementById('cartSection').scrollIntoView({behavior:'smooth'});
document.getElementById('searchBtn').onclick = () => { searchInput.style.display = searchInput.style.display === 'block' ? 'none' : 'block'; searchInput.focus(); };
searchInput.oninput = () => { const q = searchInput.value.toLowerCase(); renderProducts(products.filter(p => (p.name+p.description+p.category).toLowerCase().includes(q))); };
document.getElementById('orderBtn').onclick = () => {
  if(cart.length === 0){ alert('Votre panier est vide.'); return; }
  const body = encodeURIComponent('Bonjour ExoTiako,\n\nJe souhaite commander :\n\n' + cart.map(i => `- ${i.name} : ${i.qty} x ${euro(i.price)} = ${euro(i.qty*i.price)}`).join('\n') + `\n\nTotal : ${document.getElementById('cartTotal').textContent}\n\nNom : \nTéléphone : \nAdresse : `);
  window.location.href = `mailto:contact@exotiako.mg?subject=Commande ExoTiako&body=${body}`;
};

renderProducts();
renderCart();
