const PRODUCTS = [
  {
    id: "bissap",
    name: "Jus de bissap",
    category: "boisson",
    price: 3.5,
    unit: "bouteille",
    image: "assets/images/produits/jus-bissap.png",
    short: "Boisson fraîche à l’hibiscus, douce et parfumée.",
    description: "Un jus de bissap rafraîchissant, préparé à base de fleurs d’hibiscus. Idéal pour accompagner vos repas ou vos moments de partage."
  },
  {
    id: "beignet-legumes",
    name: "Beignet de légumes",
    category: "sale",
    price: 1.5,
    unit: "pièce",
    image: "assets/images/produits/beignet-legumes.png",
    short: "Beignet salé, croustillant et généreux en légumes.",
    description: "Un beignet de légumes savoureux, parfait en apéritif, en entrée ou pour une petite faim."
  },
  {
    id: "caca-pigeon",
    name: "Caca pigeon",
    category: "sale",
    price: 2.5,
    unit: "portion",
    image: "assets/images/produits/caca-pigeon.png",
    short: "Snack croustillant traditionnel, idéal à partager.",
    description: "Une spécialité croustillante et conviviale, parfaite pour accompagner les moments en famille ou entre amis."
  },
  {
    id: "sambos",
    name: "Sambos",
    category: "sale",
    price: 1.8,
    unit: "pièce",
    image: "assets/images/produits/sambos-legumes.png",
    short: "Sambos croustillants avec plusieurs garnitures au choix.",
    description: "Choisissez votre garniture : végétarien, poisson, poulet ou viande. Les sambos sont dorés, croustillants et préparés pour une commande conviviale.",
    variants: [
      { id: "vegetarien", name: "Végétarien", price: 1.8, image: "assets/images/produits/sambos-legumes.png" },
      { id: "poisson", name: "Poisson", price: 2.0, image: "assets/images/produits/sambos-poissons.png" },
      { id: "poulet", name: "Poulet", price: 2.0, image: "assets/images/produits/sambos-poissons.png" },
      { id: "viande", name: "Viande", price: 2.1, image: "assets/images/produits/sambos-poissons.png" }
    ]
  },
  {
    id: "nem",
    name: "Nem",
    category: "sale",
    price: 1.7,
    unit: "pièce",
    image: "assets/images/produits/nem-vegan.png",
    short: "Nems dorés avec plusieurs versions au choix.",
    description: "Choisissez votre version : végétarien, poisson, poulet ou viande. Des nems croustillants, pratiques pour composer un plateau ou une commande familiale.",
    variants: [
      { id: "vegetarien", name: "Végétarien", price: 1.7, image: "assets/images/produits/nem-vegan.png" },
      { id: "poisson", name: "Poisson", price: 1.9, image: "assets/images/produits/nem-vegan.png" },
      { id: "poulet", name: "Poulet", price: 1.9, image: "assets/images/produits/nem-poulet.png" },
      { id: "viande", name: "Viande", price: 2.0, image: "assets/images/produits/nem-viandes.png" }
    ]
  }
];
