import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      primaryLight: string;
      primaryDarker: string;
      secondary: string;
      featured: string;
      article: string;
    };
    text: {
      primary: string;
      secondary: string;
      dark: string;
      light: string;
      size: {
        smaller: string;
        small: string;
        normal: string;
        big: string;
        huge: string;
      };
    };
    status: {
      APPROVED: string!
      [key: string]: string
    }
    tags: {
      python: string;
    };
    dimensions: {
      max: string;
    };
  }
}
