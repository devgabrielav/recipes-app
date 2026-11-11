import { IconType } from 'react-icons';
import { FiCheckCircle, FiClock, FiHeart, FiHome } from 'react-icons/fi';
import { MdLocalBar, MdRestaurant } from 'react-icons/md';
import { TranslationKey } from '../../i18n/translations';

export type NavItem = {
  key: string;
  to: string;
  icon: IconType;
  label: TranslationKey;
  testId: string;
  /** Aparece também na barra inferior do celular. */
  mobile: boolean;
  isActive: (pathname: string) => boolean;
};

const inProgress = (p: string) => p === '/in-progress' || p.endsWith('/in-progress');

export const NAV_ITEMS: NavItem[] = [
  {
    key: 'home', to: '/', icon: FiHome, label: 'navHome', testId: 'home-bottom-btn',
    mobile: true, isActive: (p) => p === '/',
  },
  {
    key: 'meals', to: '/meals', icon: MdRestaurant, label: 'navMeals', testId: 'meals-bottom-btn',
    mobile: true, isActive: (p) => p.startsWith('/meals') && !inProgress(p),
  },
  {
    key: 'drinks', to: '/drinks', icon: MdLocalBar, label: 'navDrinks', testId: 'drinks-bottom-btn',
    mobile: true, isActive: (p) => p.startsWith('/drinks') && !inProgress(p),
  },
  {
    key: 'in-progress', to: '/in-progress', icon: FiClock, label: 'navInProgress',
    testId: 'in-progress-bottom-btn', mobile: true, isActive: inProgress,
  },
  {
    key: 'favorites', to: '/favorite-recipes', icon: FiHeart, label: 'navFavorites',
    testId: 'favorites-bottom-btn', mobile: true, isActive: (p) => p === '/favorite-recipes',
  },
  {
    key: 'done', to: '/done-recipes', icon: FiCheckCircle, label: 'navDone',
    testId: 'done-bottom-btn', mobile: false, isActive: (p) => p === '/done-recipes',
  },
];
