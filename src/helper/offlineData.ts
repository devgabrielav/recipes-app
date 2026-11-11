/**
 * Receitas de exemplo embutidas no app. Só são usadas quando a API está fora do ar
 * E não existe nenhuma resposta salva em cache — assim o app nunca fica em branco.
 */
import {
  DrinksDetailsType, MealsDetailsType, RecipeKind, RecipeType,
} from '../utils/types';

type Seed = {
  id: string;
  name: string;
  category: string;
  area?: string;
  alcoholic?: string;
  tags?: string;
  emoji: string;
  color: string;
  ingredients: [string, string][];
  instructions: string;
};

const placeholder = (emoji: string, color: string) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">`
    + `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">`
    + `<stop offset="0" stop-color="${color}"/><stop offset="1" stop-color="#fff4e6"/>`
    + `</linearGradient></defs><rect width="400" height="300" fill="url(#g)"/>`
    + `<text x="200" y="185" font-size="120" text-anchor="middle">${emoji}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const MEAL_SEEDS: Seed[] = [
  {
    id: 'offline-m1',
    name: 'Spaghetti Carbonara',
    category: 'Pasta',
    area: 'Italian',
    tags: 'Pasta,Classic',
    emoji: '🍝',
    color: '#f9c97c',
    ingredients: [['Spaghetti', '400g'], ['Eggs', '4'], ['Pecorino Romano', '80g'],
      ['Guanciale', '150g'], ['Black Pepper', 'to taste']],
    instructions: 'Boil the spaghetti in salted water. Meanwhile, fry the guanciale until crisp. '
      + 'Beat the eggs with the grated pecorino and plenty of pepper. Drain the pasta, '
      + 'toss it with the guanciale off the heat, then stir in the egg mixture with a splash '
      + 'of pasta water until creamy. Serve immediately.',
  },
  {
    id: 'offline-m2',
    name: 'Chicken Tikka Masala',
    category: 'Chicken',
    area: 'Indian',
    tags: 'Curry,Spicy',
    emoji: '🍛',
    color: '#f4a261',
    ingredients: [['Chicken Breast', '600g'], ['Yogurt', '150g'], ['Tomato Puree', '400g'],
      ['Onion', '1'], ['Garlic', '3 cloves'], ['Garam Masala', '2 tsp'], ['Cream', '100ml']],
    instructions: 'Marinate the chicken in yogurt and half of the garam masala for 1 hour. '
      + 'Grill or pan-fry until charred. Sauté the onion and garlic, add the remaining spices '
      + 'and the tomato puree, then simmer for 15 minutes. Add the chicken and cream and cook '
      + 'for 10 more minutes. Serve with rice or naan.',
  },
  {
    id: 'offline-m3',
    name: 'Beef Tacos',
    category: 'Beef',
    area: 'Mexican',
    tags: 'Street Food',
    emoji: '🌮',
    color: '#e9c46a',
    ingredients: [['Ground Beef', '500g'], ['Taco Shells', '8'], ['Cumin', '1 tsp'],
      ['Paprika', '1 tsp'], ['Lettuce', '1 cup'], ['Tomato', '2'], ['Cheddar', '100g']],
    instructions: 'Brown the beef in a pan, then stir in cumin, paprika, salt and a splash of '
      + 'water; simmer for 8 minutes. Warm the taco shells. Fill with beef, lettuce, diced '
      + 'tomato and grated cheddar.',
  },
  {
    id: 'offline-m4',
    name: 'Greek Salad',
    category: 'Vegetarian',
    area: 'Greek',
    tags: 'Fresh,Salad',
    emoji: '🥗',
    color: '#a7d7a0',
    ingredients: [['Cucumber', '1'], ['Tomato', '4'], ['Red Onion', '1/2'], ['Feta', '200g'],
      ['Kalamata Olives', '12'], ['Olive Oil', '3 tbsp'], ['Oregano', '1 tsp']],
    instructions: 'Chop the cucumber, tomatoes and onion into chunks. Combine in a bowl with the '
      + 'olives. Top with a slab of feta, drizzle with olive oil and sprinkle with oregano.',
  },
  {
    id: 'offline-m5',
    name: 'Fluffy Pancakes',
    category: 'Breakfast',
    area: 'American',
    tags: 'Sweet,Brunch',
    emoji: '🥞',
    color: '#f6d6a8',
    ingredients: [['Flour', '200g'], ['Milk', '300ml'], ['Eggs', '2'], ['Baking Powder', '2 tsp'],
      ['Sugar', '2 tbsp'], ['Butter', '30g']],
    instructions: 'Whisk the dry ingredients. Mix the milk, eggs and melted butter, then combine '
      + 'with the dry mix until just incorporated. Cook ladlefuls on a buttered pan until '
      + 'bubbles form, flip and cook until golden.',
  },
  {
    id: 'offline-m6',
    name: 'Brigadeiro',
    category: 'Dessert',
    area: 'Brazilian',
    tags: 'Sweet,Party',
    emoji: '🍫',
    color: '#c08457',
    ingredients: [['Condensed Milk', '1 can'], ['Cocoa Powder', '3 tbsp'], ['Butter', '1 tbsp'],
      ['Chocolate Sprinkles', '1 cup']],
    instructions: 'Cook the condensed milk, cocoa and butter over medium heat, stirring, until '
      + 'the mixture pulls away from the bottom of the pan. Let it cool, roll into balls '
      + 'and coat with chocolate sprinkles.',
  },
];

const DRINK_SEEDS: Seed[] = [
  {
    id: 'offline-d1',
    name: 'Caipirinha',
    category: 'Ordinary Drink',
    alcoholic: 'Alcoholic',
    tags: 'Brazilian,Classic',
    emoji: '🍋',
    color: '#c7e8a1',
    ingredients: [['Cachaça', '2 oz'], ['Lime', '1'], ['Sugar', '2 tsp'], ['Ice', 'Cubed']],
    instructions: 'Muddle the lime wedges with the sugar in a glass. Add ice and cachaça, '
      + 'then stir well.',
  },
  {
    id: 'offline-d2',
    name: 'Mojito',
    category: 'Cocktail',
    alcoholic: 'Alcoholic',
    tags: 'Refreshing',
    emoji: '🌿',
    color: '#b7e4c7',
    ingredients: [['White Rum', '2 oz'], ['Lime Juice', '1 oz'], ['Mint', '8 leaves'],
      ['Sugar', '2 tsp'], ['Soda Water', 'Top']],
    instructions: 'Gently muddle the mint with sugar and lime juice. Add rum and ice, '
      + 'top with soda water and stir.',
  },
  {
    id: 'offline-d3',
    name: 'Margarita',
    category: 'Ordinary Drink',
    alcoholic: 'Alcoholic',
    tags: 'Classic',
    emoji: '🍹',
    color: '#ffe8a3',
    ingredients: [['Tequila', '2 oz'], ['Triple Sec', '1 oz'], ['Lime Juice', '1 oz'], ['Salt', 'Rim']],
    instructions: 'Rub the rim of a glass with lime and dip it in salt. Shake the tequila, '
      + 'triple sec and lime juice with ice, then strain into the glass.',
  },
  {
    id: 'offline-d4',
    name: 'Fresh Lemonade',
    category: 'Soft Drink',
    alcoholic: 'Non alcoholic',
    tags: 'Summer',
    emoji: '🥤',
    color: '#fff3a3',
    ingredients: [['Lemon Juice', '1 cup'], ['Sugar', '3/4 cup'], ['Water', '4 cups'], ['Ice', 'Cubed']],
    instructions: 'Dissolve the sugar in a little warm water. Add lemon juice and the remaining '
      + 'cold water, stir and serve over ice.',
  },
  {
    id: 'offline-d5',
    name: 'Hot Chocolate',
    category: 'Cocoa',
    alcoholic: 'Non alcoholic',
    tags: 'Winter',
    emoji: '☕',
    color: '#d4a373',
    ingredients: [['Milk', '250ml'], ['Dark Chocolate', '50g'], ['Sugar', '1 tsp']],
    instructions: 'Heat the milk without boiling, whisk in the chopped chocolate and sugar '
      + 'until smooth and serve hot.',
  },
  {
    id: 'offline-d6',
    name: 'Espresso Tonic',
    category: 'Coffee / Tea',
    alcoholic: 'Non alcoholic',
    tags: 'Coffee',
    emoji: '🧊',
    color: '#bfd7ea',
    ingredients: [['Espresso', '1 shot'], ['Tonic Water', '150ml'], ['Ice', 'Cubed'], ['Orange Peel', '1 strip']],
    instructions: 'Fill a glass with ice and tonic water. Slowly pour the espresso over the top '
      + 'and garnish with orange peel.',
  },
];

function expandIngredients(seed: Seed) {
  const fields: Record<string, string | null> = {};
  for (let i = 1; i <= 15; i += 1) {
    const item = seed.ingredients[i - 1];
    fields[`strIngredient${i}`] = item ? item[0] : null;
    fields[`strMeasure${i}`] = item ? item[1] : null;
  }
  return fields;
}

const toMeal = (seed: Seed): MealsDetailsType => ({
  idMeal: seed.id,
  strMeal: seed.name,
  strMealThumb: placeholder(seed.emoji, seed.color),
  strCategory: seed.category,
  strArea: seed.area,
  strInstructions: seed.instructions,
  strTags: seed.tags ?? null,
  strYoutube: '',
  ...expandIngredients(seed),
} as MealsDetailsType);

const toDrink = (seed: Seed): DrinksDetailsType => ({
  idDrink: seed.id,
  strDrink: seed.name,
  strDrinkThumb: placeholder(seed.emoji, seed.color),
  strCategory: seed.category,
  strAlcoholic: seed.alcoholic ?? 'Non alcoholic',
  strInstructions: seed.instructions,
  strTags: seed.tags ?? null,
  strYoutube: '',
  ...expandIngredients(seed),
} as DrinksDetailsType);

const MEALS = MEAL_SEEDS.map(toMeal);
const DRINKS = DRINK_SEEDS.map(toDrink);

const all = (kind: RecipeKind) => (kind === 'meals' ? MEALS : DRINKS);
const nameOf = (r: MealsDetailsType | DrinksDetailsType) => (
  'idMeal' in r ? r.strMeal : r.strDrink);

const toSummary = (r: MealsDetailsType | DrinksDetailsType): RecipeType => (
  'idMeal' in r
    ? { idMeal: r.idMeal, strMeal: r.strMeal, strMealThumb: r.strMealThumb }
    : { idDrink: r.idDrink, strDrink: r.strDrink, strDrinkThumb: r.strDrinkThumb });

const ingredientsOf = (r: MealsDetailsType | DrinksDetailsType) => Object
  .keys(r)
  .filter((key) => key.startsWith('strIngredient'))
  .map((key) => String(r[key as keyof typeof r] ?? '').toLowerCase())
  .filter(Boolean);

export const isOfflineId = (id: string) => id.startsWith('offline-');

export function offlineList(kind: RecipeKind): RecipeType[] {
  return all(kind).map(toSummary);
}

export function offlineSearch(kind: RecipeKind, option: string, query: string): RecipeType[] {
  const text = query.trim().toLowerCase();
  return all(kind)
    .filter((recipe) => {
      if (option === 'ingredient') return ingredientsOf(recipe).some((i) => i.includes(text));
      if (option === 'first-letter') return nameOf(recipe).toLowerCase().startsWith(text);
      return nameOf(recipe).toLowerCase().includes(text);
    })
    .map(toSummary);
}

export function offlineById(kind: RecipeKind, id: string) {
  return all(kind).find((recipe) => (
    ('idMeal' in recipe ? recipe.idMeal : recipe.idDrink) === id)) ?? null;
}

export function offlineCategories(kind: RecipeKind) {
  return [...new Set(all(kind).map((recipe) => recipe.strCategory))]
    .map((strCategory) => ({ strCategory }));
}

export function offlineByCategory(kind: RecipeKind, category: string): RecipeType[] {
  return all(kind).filter((recipe) => recipe.strCategory === category).map(toSummary);
}

export function offlineRandom(kind: RecipeKind) {
  const list = all(kind);
  return list[Math.floor(Math.random() * list.length)];
}
