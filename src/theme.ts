import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  config: { initialColorMode: 'light', useSystemColorMode: false },
  fonts: {
    heading: "'Fraunces', Georgia, 'Times New Roman', serif",
    body: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  colors: {
    brand: {
      50: '#FFF1EC',
      100: '#FFDDD2',
      200: '#FFBBA5',
      300: '#FF9677',
      400: '#F57150',
      500: '#E5532D',
      600: '#C73F1D',
      700: '#A03016',
      800: '#78240F',
      900: '#4F1809',
    },
    basil: {
      50: '#E8F5EE',
      100: '#C7E6D5',
      200: '#9FD3B8',
      300: '#72BE98',
      400: '#4BA77C',
      500: '#2E7D5B',
      600: '#256649',
      700: '#1D5039',
      800: '#143A29',
      900: '#0C2419',
    },
    grape: {
      50: '#F1ECFB',
      100: '#DDD1F4',
      200: '#C0AAE9',
      300: '#A183DC',
      400: '#845FCB',
      500: '#6C4AB6',
      600: '#573B93',
      700: '#432D71',
      800: '#2F204F',
      900: '#1C1330',
    },
    cream: { 50: '#FFFCF8', 100: '#FFF9F3', 200: '#FBEFE2', 300: '#F3DFCB' },
    ink: { 500: '#2A1E16', 400: '#5C4A3D', 300: '#8B7867' },
  },
  radii: { xl: '16px', '2xl': '22px' },
  shadows: {
    card: '0 1px 2px rgba(42,30,22,.06), 0 8px 24px rgba(42,30,22,.08)',
    lift: '0 2px 4px rgba(42,30,22,.08), 0 18px 40px rgba(42,30,22,.14)',
  },
  styles: {
    global: {
      'html, body': { bg: 'cream.100', color: 'ink.500' },
      body: { WebkitFontSmoothing: 'antialiased', minHeight: '100dvh' },
      '*:focus-visible': {
        outline: '3px solid #F57150', outlineOffset: '2px', borderRadius: '8px',
      },
      '@media (prefers-reduced-motion: reduce)': {
        '*': { animation: 'none !important', transition: 'none !important' },
      },
    },
  },
  components: {
    Button: {
      baseStyle: { fontWeight: 700, borderRadius: 'xl' },
      defaultProps: { colorScheme: 'brand' },
    },
    Heading: { baseStyle: { letterSpacing: '-0.02em', color: 'ink.500' } },
    Input: { defaultProps: { focusBorderColor: 'brand.400' } },
  },
});
