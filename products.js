const PRODUCTS = [
  {
    id: "bissap",
    name: "Jus de bissap",
    category: "boisson",
    price: 3.5,
    unit: "bouteille",
    image: "assets/images/bissap.png",
    short: "Boisson fraîche à l’hibiscus, douce et parfumée.",
    description: "Un jus de bissap rafraîchissant, préparé à base de fleurs d’hibiscus."
  },
  {
    id: "beignet-legumes",
    name: "Beignet de légumes",
    category: "sale",
    price: 1.5,
    unit: "pièce",
    image: "assets/images/beignet-legumes.png",
    short: "Beignet salé, croustillant et généreux en légumes.",
    description: "Un beignet de légumes savoureux, parfait en apéritif ou pour une petite faim."
  },
  {
    id: "caca-pigeon",
    name: "Caca pigeon",
    category: "sale",
    price: 2.5,
    unit: "portion",
    image: "assets/images/caca-pigeon.png",
    short: "Snack croustillant traditionnel, idéal à partager.",
    description: "Une spécialité croustillante et conviviale."
  },
  {
    id: "sambos",
    name: "Sambos",
    category: "sale",
    price: 1.8,
    unit: "pièce",
    image: "assets/images/sambos.png",
    short: "Sambos croustillants avec plusieurs garnitures au choix.",
    description: "Choisissez votre garniture : végétarien, poisson, poulet ou viande.",
    variants: [
      { id: "vegetarien", name: "Végétarien", price: 1.8, image: "assets/images/sambos.png" },
      { id: "poisson", name: "Poisson", price: 2.0, image: "assets/images/sambos.png" },
      { id: "poulet", name: "Poulet", price: 2.0, image: "assets/images/sambos.png" },
      { id: "viande", name: "Viande", price: 2.1, image: "assets/images/sambos.png" }
    ]
  },
  {
    id: "nem",
    name: "Nems",
    category: "sale",
    price: 1.7,
    unit: "pièce",
    image: "assets/images/nems.png",
    short: "Nems dorés avec plusieurs versions au choix.",
    description: "Choisissez votre version : végétarien, poisson, poulet ou viande.",
    variants: [
      { id: "vegetarien", name: "Végétarien", price: 1.7, image: "assets/images/nems.png" },
      { id: "poisson", name: "Poisson", price: 1.9, image: "assets/images/nems.png" },
      { id: "poulet", name: "Poulet", price: 1.9, image: "assets/images/nems.png" },
      { id: "viande", name: "Viande", price: 2.0, image: "assets/images/nems.png" }
    ]
  },
  {
    id: "piment-madagascar",
    name: "Piment de Madagascar",
    category: "epice",
    price: 2.0,
    unit: "sachet 50g",
    image: "assets/images/piment-madagascar.png",
    short: "Piments rouges séchés, puissants et parfumés.",
    description: "Piment de Madagascar idéal pour relever vos plats exotiques."
  }
];