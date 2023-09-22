import { createContext } from 'react';
import { LayoutContextType } from '../../utils/types';
import initialValue from './initialValue';

export const layoutContext = createContext([initialValue, () => {}] as LayoutContextType);
