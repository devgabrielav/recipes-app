import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';
import { theme } from './theme';
import { I18nProvider } from './i18n/I18nProvider';

ReactDOM
  .createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <React.StrictMode>
      <BrowserRouter basename={ import.meta.env.BASE_URL }>
        <ChakraProvider theme={ theme }>
          <I18nProvider>
            <App />
          </I18nProvider>
        </ChakraProvider>
      </BrowserRouter>
    </React.StrictMode>,
  );
