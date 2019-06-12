import React from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import styledNormalize from 'styled-normalize';
import pallet from './styles/pallet';
import Meta from './Meta';
import Header from './Header';

const StyledPage = styled.div`
  background: white;
  color: ${props => props.theme.colors.primary};
`;

const Inner = styled.div`
  max-width: ${props => props.theme.dimensions.max};
  margin: 0 auto;
  padding: 2rem;
`;

export const GlobalStyle = createGlobalStyle`
    ${styledNormalize}

    html {
    box-sizing: border-box;
    font-size: 62.5%;
    height:100%;
  }

  *,
  *::after,
  *::before {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }

  body {
    font-family: 'Fira Sans', sans-serif;
    line-height: 1.7;
    font-size: 1.6rem;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height:100%;
    background-color: #F2F2F2;
  }

  h3 {
      font-size: 1.6rem;
      line-height: 1.38;
      font-weight: 400;
  }

  a {
    color: blue;
    text-decoration: none; /* no underline */
  }
`;

const Page: React.SFC = props => (
  <>
    <GlobalStyle />
    <ThemeProvider theme={pallet}>
      <StyledPage>
        <Meta />
        <Header />
        <Inner>{props.children}</Inner>
      </StyledPage>
    </ThemeProvider>
  </>
);

export default Page;
