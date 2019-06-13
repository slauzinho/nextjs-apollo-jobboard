import React from 'react';
import App, { Container, AppProps, DefaultAppIProps } from 'next/app';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import withApollo, { IApolloProps } from '../lib/withApollo';
import Page from '../components/Page';
import checkLoggedIn from '../lib/checkLoggedIn';

class MyApp extends App<IApolloProps & DefaultAppIProps & AppProps> {
  //@ts-ignore
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    await checkLoggedIn(ctx.apolloClient);
    return { pageProps };
  }

  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <ApolloHooksProvider client={apolloClient}>
            <Page {...pageProps}>
              <Component {...pageProps} />
            </Page>
          </ApolloHooksProvider>
        </ApolloProvider>
      </Container>
    );
  }
}

// @ts-ignore
export default withApollo(MyApp);
