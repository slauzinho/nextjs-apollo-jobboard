import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      featured: string;
    };
    text: {
      primary: string;
      secondary: string;
      dark: string;
      light: string;
    };
    tags: {
      python: string;
    };
    dimensions: {
      max: string;
    };
  }
}
