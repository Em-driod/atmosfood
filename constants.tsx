
import { FoodCategory, FoodItem, ProteinOption } from './types';

export const PROTEIN_OPTIONS: ProteinOption[] = [
  { id: 'p-chicken', name: 'Grilled Chicken', price: 3500 },
  { id: 'p-beef', name: 'Spicy Beef', price: 4000 },
  { id: 'p-fish', name: 'Fried Fish', price: 6500 },
];

export const FOOD_ITEMS: FoodItem[] = [
  // THE GRAINS (THE 3 MAIN DELICACIES)
  {
    id: 'grain-1',
    name: 'Jollof Rice',
    description: 'Authentic Nigerian long-grain rice parboiled in a rich, spicy tomato reduction. The soul of the party.',
    price: 4500,
    category: FoodCategory.GRAINS,
    image: '/jollof.jpeg',
    rating: 4.9,
    calories: 550,
    tags: ['Legendary', 'Spicy']
  },
  {
    id: 'grain-2',
    name: 'Fried Rice',
    description: 'Savory seasoned rice stir-fried with sweet peas, carrots, and aromatic local spices.',
    price: 4500,
    category: FoodCategory.GRAINS,
    image: '/fried.jpeg',
    rating: 4.8,
    calories: 520,
    tags: ['Signature']
  },
  {
    id: 'grain-3',
    name: 'Mixed Rice',
    description: 'A perfect "sync" of both worlds. A half-and-half portion of our Jollof and Fried Rice.',
    price: 5500,
    category: FoodCategory.GRAINS,
    image: '/jollofandfried.jpeg',
    rating: 5.0,
    calories: 540,
    tags: ['Best Value']
  },

  // DRINKS
  {
    id: 'drink-1',
    name: 'Coca-Cola',
    description: 'Classic refreshment. Chilled glass bottle.',
    price: 800,
    category: FoodCategory.DRINKS,
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    calories: 140,
    tags: ['Cold']
  },
  {
    id: 'drink-2',
    name: 'Fanta Orange',
    description: 'The orange vibe. Ice cold.',
    price: 800,
    category: FoodCategory.DRINKS,
    image: 'https://images.unsplash.com/photo-1624517452488-04869289c4ca?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    calories: 160,
    tags: ['Fruity']
  },
  {
    id: 'drink-3',
    name: 'Sprite',
    description: 'Lemon-lime crispness.',
    price: 800,
    category: FoodCategory.DRINKS,
    image: 'https://images.unsplash.com/photo-1625772290748-39126ddd9661?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    calories: 140,
    tags: ['Fresh']
  }
];
