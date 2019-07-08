import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  colors: {
    primary: '#497BFF',
    secondary: '#E8F2FF',
    featured: '#FFBE6D',
    article: '#F5F6FA',
    primaryLight: '#4B7AFF',
    primaryDarker: '#0F3DBE',
  },
  text: {
    primary: '#98989E',
    secondary: '#0C75FF',
    dark: '#272E3F',
    light: '#8EA1BA',
    size: {
      smaller: '1.2rem',
      small: '1.4rem',
      normal: '1.6rem',
      big: '1.8rem',
      huge: '2.2rem',
    },
  },
  status: {
    APPROVED: '#D3FFDC',
    REJECTED: '#FFD4D7',
    EXPIRED: '#E1E2E7',
    PENDING: '#FFEDD2',
  },
  tags: {
    python: '',
  },
  dimensions: {
    max: '1900px',
  },
};

export default theme;
