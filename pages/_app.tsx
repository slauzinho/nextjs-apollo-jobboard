import React from 'react';
import App, { Container, AppProps, DefaultAppIProps } from 'next/app';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import withApollo, { IApolloProps } from '../lib/withApollo';
import Page from '../components/Page';

class MyApp extends App<IApolloProps & DefaultAppIProps & AppProps> {
  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <ApolloHooksProvider client={apolloClient}>
            <Page>
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
