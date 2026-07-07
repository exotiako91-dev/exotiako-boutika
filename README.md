# ExoTiako - version statique

Site vitrine de produits exotiques en HTML, CSS et JavaScript, sans Node.js.

## Tester localement

Ouvrir directement `index.html` dans le navigateur.

Ou depuis le terminal :

```bash
python3 -m http.server 8000
```

Puis ouvrir :

```txt
http://localhost:8000
```

## Modifier l'email de commande

Dans `script.js`, remplacer :

```js
const sellerEmail = "votre-email@example.com";
```

par votre adresse email.

## Modifier les produits

Les produits sont dans `products.js`.

## Publier sur GitHub Pages

Copier tout le contenu de ce dossier à la racine du dépôt GitHub, puis :

```bash
git add .
git commit -m "Ajout version statique ExoTiako"
git push origin main
```
