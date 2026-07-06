import { useMemo, useState } from 'react';
import { products } from './products.js';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function formatPrice(value) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value);
}

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);
  const [customer, setCustomer] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  function addToCart(product, qty) {
    const safeQty = Math.max(1, Number(qty) || 1);
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + safeQty } : item
        );
      }
      return [...current, { ...product, quantity: safeQty }];
    });
    setQuantity(1);
    setStatus(`${product.name} ajouté au panier.`);
  }

  function removeFromCart(productId) {
    setCart((current) => current.filter((item) => item.id !== productId));
  }

  function updateCartQuantity(productId, qty) {
    const safeQty = Math.max(1, Number(qty) || 1);
    setCart((current) =>
      current.map((item) => (item.id === productId ? { ...item, quantity: safeQty } : item))
    );
  }

  function handleCustomerChange(event) {
    const { name, value } = event.target;
    setCustomer((current) => ({ ...current, [name]: value }));
  }

  async function submitOrder(event) {
    event.preventDefault();
    setStatus('');

    if (cart.length === 0) {
      setStatus('Votre panier est vide.');
      return;
    }
    if (!customer.name || !customer.email || !customer.phone) {
      setStatus('Merci de renseigner votre nom, email et téléphone.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customer, cart, total })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Erreur pendant la commande.');

      setStatus('Commande envoyée avec succès. Vous serez contacté rapidement.');
      setCart([]);
      setCustomer({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      setStatus(error.message || 'Impossible d’envoyer la commande.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">
      <header className="hero">
        <nav className="navbar">
          <div className="logo">Exo<span>Tiako</span></div>
          <a href="#commande" className="nav-button">Commander</a>
        </nav>
        <div className="hero-content">
          <p className="badge">Saveurs des îles & d’ailleurs</p>
          <h1>ExoTiako</h1>
          <p>Goûtez nos spécialités exotiques venant des îles et de tout horizon.</p>
          <a href="#produits" className="primary-button">Voir les produits</a>
        </div>
      </header>

      <main>
        <section id="produits" className="section">
          <div className="section-title">
            <p>Notre vitrine</p>
            <h2>Produits disponibles</h2>
          </div>

          <div className="layout">
            <div className="products-grid">
              {products.map((product) => (
                <article
                  key={product.id}
                  className={`product-card ${selectedProduct.id === product.id ? 'active' : ''}`}
                  onClick={() => setSelectedProduct(product)}
                >
                  <img src={product.image} alt={product.name} />
                  <div>
                    <span>{product.category}</span>
                    <h3>{product.name}</h3>
                    <p>{formatPrice(product.price)}</p>
                  </div>
                </article>
              ))}
            </div>

            <aside className="detail-card">
              <img src={selectedProduct.image} alt={selectedProduct.name} />
              <span>{selectedProduct.category}</span>
              <h2>{selectedProduct.name}</h2>
              <p>{selectedProduct.description}</p>
              <strong>{formatPrice(selectedProduct.price)}</strong>
              <div className="quantity-row">
                <label htmlFor="quantity">Quantité</label>
                <input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(event) => setQuantity(event.target.value)}
                />
              </div>
              <button onClick={() => addToCart(selectedProduct, quantity)} className="primary-button full">
                Ajouter au panier
              </button>
            </aside>
          </div>
        </section>

        <section id="commande" className="section order-section">
          <div className="cart-card">
            <h2>Votre panier</h2>
            {cart.length === 0 ? (
              <p className="empty">Aucun produit sélectionné.</p>
            ) : (
              <div className="cart-list">
                {cart.map((item) => (
                  <div className="cart-item" key={item.id}>
                    <div>
                      <h3>{item.name}</h3>
                      <p>{formatPrice(item.price)} / unité</p>
                    </div>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(event) => updateCartQuantity(item.id, event.target.value)}
                    />
                    <strong>{formatPrice(item.price * item.quantity)}</strong>
                    <button type="button" onClick={() => removeFromCart(item.id)}>Retirer</button>
                  </div>
                ))}
              </div>
            )}
            <div className="total-row">
              <span>Total estimé</span>
              <strong>{formatPrice(total)}</strong>
            </div>
          </div>

          <form className="form-card" onSubmit={submitOrder}>
            <h2>Finaliser la commande</h2>
            <input name="name" placeholder="Votre nom" value={customer.name} onChange={handleCustomerChange} />
            <input name="email" type="email" placeholder="Votre email" value={customer.email} onChange={handleCustomerChange} />
            <input name="phone" placeholder="Votre téléphone" value={customer.phone} onChange={handleCustomerChange} />
            <textarea name="message" placeholder="Message complémentaire" value={customer.message} onChange={handleCustomerChange} />
            <button className="primary-button full" disabled={loading}>
              {loading ? 'Envoi en cours...' : 'Commander'}
            </button>
            {status && <p className="status">{status}</p>}
          </form>
        </section>
      </main>

      <footer>
        <p>© {new Date().getFullYear()} ExoTiako - Spécialités exotiques</p>
      </footer>
    </div>
  );
}
