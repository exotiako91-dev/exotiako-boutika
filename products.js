const PRODUCTS = [
  {
    id: "bissap",
    name: "Jus de bissap",
    category: "jus",
    categoryLabel: "Jus",
    price: 3.5,
    unit: "bouteille",
    image: "assets/images/bissap.png",
    short: "Boisson fraîche à l’hibiscus, douce et parfumée.",
    description: "Un jus de bissap rafraîchissant, préparé à base de fleurs d’hibiscus. Idéal pour accompagner vos repas, vos apéritifs ou vos moments de partage."
  },
  {
    id: "beignet-legumes",
    name: "Beignet de légumes",
    category: "sale",
    categoryLabel: "Salé",
    price: 1.5,
    unit: "pièce",
    image: "assets/images/beignet-legumes.png",
    short: "Beignet salé, croustillant et généreux en légumes.",
    description: "Un beignet de légumes savoureux, parfait en apéritif, en entrée ou pour une petite faim."
  },
  {
    id: "beignet-sucre",
    name: "Beignet sucré",
    category: "sucre",
    categoryLabel: "Sucré",
    price: 1.5,
    unit: "pièce",
    image: "assets/images/beignet-sucre.png",
    short: "Beignet moelleux, légèrement sucré et gourmand.",
    description: "Un beignet sucré doux et moelleux, idéal pour le goûter, le petit-déjeuner ou un moment gourmand."
  },
  {
    id: "caca-pigeon",
    name: "Caca pigeon",
    category: "sale",
    categoryLabel: "Salé",
    price: 2.5,
    unit: "portion",
    image: "assets/images/caca-pigeon.png",
    short: "Snack croustillant traditionnel, idéal à partager.",
    description: "Une spécialité croustillante et conviviale, parfaite pour accompagner les moments en famille ou entre amis."
  },
  {
    id: "sambos",
    name: "Sambos",
    category: "sale",
    categoryLabel: "Salé",
    price: 1.8,
    unit: "pièce",
    image: "assets/images/sambos.png",
    short: "Sambos croustillants avec plusieurs garnitures au choix.",
    description: "Choisissez votre garniture : végétarien, poisson, poulet ou viande. Les sambos sont dorés, croustillants et préparés pour une commande conviviale.",
    variants: [
      { id: "vegetarien", name: "Végétarien", price: 1.8 },
      { id: "poisson", name: "Poisson", price: 2.0 },
      { id: "poulet", name: "Poulet", price: 2.0 },
      { id: "viande", name: "Viande", price: 2.1 }
    ]
  },
  {
    id: "nems",
    name: "Nems",
    category: "sale",
    categoryLabel: "Salé",
    price: 1.7,
    unit: "pièce",
    image: "assets/images/nems.png",
    short: "Nems dorés et croustillants avec plusieurs versions au choix.",
    description: "Choisissez votre version : végétarien, poisson, poulet ou viande. Des nems croustillants, pratiques pour composer un plateau ou une commande familiale.",
    variants: [
      { id: "vegetarien", name: "Végétarien", price: 1.7 },
      { id: "poisson", name: "Poisson", price: 1.9 },
      { id: "poulet", name: "Poulet", price: 1.9 },
      { id: "viande", name: "Viande", price: 2.0 }
    ]
  },
  {
    id: "piment-madagascar",
    name: "Piment de Madagascar",
    category: "sale",
    categoryLabel: "Salé",
    price: 2.0,
    unit: "sachet 50g",
    image: "assets/images/piment-madagascar.png",
    short: "Piments rouges séchés, puissants et parfumés.",
    description: "Piment de Madagascar idéal pour relever vos plats exotiques et apporter une touche parfumée."
  }
];
