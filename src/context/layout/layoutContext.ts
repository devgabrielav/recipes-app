import { createContext } from 'react';
import { LayoutType } from '../../utils/types';
import initialValue from './initialValue';

type ContextType = [LayoutType, React.Dispatch<React.SetStateAction<LayoutType>>];
export const layoutContext = createContext([initialValue, () => {}] as ContextType);
