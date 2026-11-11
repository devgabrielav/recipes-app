import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import userEvent from '@testing-library/user-event';
import { theme } from '../theme';
import { I18nProvider } from '../i18n/I18nProvider';
import { Lang } from '../i18n/translations';

type Options = { route?: string; lang?: Lang };

export const renderWithRouter = (ui: JSX.Element, { route = '/', lang = 'en' }: Options = {}) => {
  window.history.pushState({}, '', route);

  return {
    user: userEvent.setup(),
    ...render(ui, {
      wrapper: ({ children }) => (
        <BrowserRouter>
          <ChakraProvider theme={ theme }>
            <I18nProvider initialLang={ lang }>{children}</I18nProvider>
          </ChakraProvider>
        </BrowserRouter>
      ),
    }),
  };
};
