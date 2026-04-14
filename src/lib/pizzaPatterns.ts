import type { DataPattern } from './types';

export const PIZZA_PATTERNS: DataPattern[] = [
  {
    name: 'Basil',
    nameJa: 'バジル',
    id: 'basil',
    pattern: /\bbasil\b/i,
  },
  {
    name: 'Greek',
    nameJa: 'ギリシャ風',
    id: 'greek-pizza',
    pattern: /\b(greek|greek\s*pizza)\b/i,
  },
  {
    name: 'Grilled Chicken',
    nameJa: 'グリルチキン',
    id: 'grilled-chicken',
    pattern: /\b(grilled\s*chicken|chicken)\b/i,
  },
  {
    name: 'Ham',
    nameJa: 'ハム',
    id: 'ham',
    pattern: /\b(ham|canadian\s*bacon|bacon\s*ham)\b/i,
  },
  {
    name: 'Hawaiian',
    nameJa: 'ハワイアンピザ',
    id: 'hawaiian',
    pattern: /\b(hawaiian|hawaiian\s*pizza|pineapple\s*ham)\b/i,
  },
  {
    name: 'Jalapeños',
    nameJa: 'ハラペーニョ',
    id: 'jalapenos',
    pattern: /\b(jalapeno|jalapeños|jalapenos)\b/i,
  },
  {
    name: 'Margherita',
    nameJa: 'マルゲリータ',
    id: 'margherita',
    pattern: /\b(margherita|margarita\s*pizza)\b/i,
  },
  {
    name: 'Mozzarella',
    nameJa: 'モッツァレラ',
    id: 'mozzarella',
    pattern: /\b(mozzarella|fresh\s*mozzarella|mozza)\b/i,
  },
  {
    name: 'Mushrooms',
    nameJa: 'マッシュルーム',
    id: 'mushrooms',
    pattern: /\b(mushroom|mushrooms|funghi|fungi)\b/i,
  },
  {
    name: 'Pepperoni',
    nameJa: 'ペパロニ',
    id: 'pepperoni',
    pattern: /\bpepperoni\b/i,
  },
  {
    name: 'Pesto',
    nameJa: 'ペスト',
    id: 'pesto',
    pattern: /\bpesto\b/i,
  },
  {
    name: 'Pineapple',
    nameJa: 'パイナップル',
    id: 'pineapple',
    pattern: /\bpineapple\b/i,
  },
  {
    name: 'Sausage',
    nameJa: 'ソーセージ',
    id: 'sausage',
    pattern: /\b(sausage|italian\s*sausage)\b/i,
  },
  {
    name: 'Spinach',
    nameJa: 'ほうれん草',
    id: 'spinach',
    pattern: /\bspinach\b/i,
  },
  {
    name: 'Tuna',
    nameJa: 'ツナ',
    id: 'tuna',
    pattern: /\b(tuna|tonno)\b/i,
  },
  {
    name: 'Tomato',
    nameJa: 'トマト',
    id: 'tomato',
    pattern: /\b(tomato|tomatoes)\b/i,
  },
];
