import React from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import styledNormalize from 'styled-normalize';
import pallet from './styles/pallet';
import Meta from './Meta';
import Header from './Header';
import { NextFunctionComponent } from 'next';
import { IApolloProps, AppContext } from 'lib/withApollo';

const StyledPage = styled.div`
  background: white;
  color: ${props => props.theme.text.dark};
`;

const Inner = styled.div`
  margin: 0 auto;
  padding: 0 2rem;
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
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
    line-height: 1.7;
    font-size: 1.6rem;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height:100%;
    background-color: #F2F2F2;
    color: #454F5B;
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

const Page: NextFunctionComponent<IApolloProps, any, AppContext> = props => (
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

Page.getInitialProps = async ctx => {
  console.log('PROOOOO', ctx);
  return {};
};

export default Page;
