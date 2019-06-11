import React from 'react';
import { Container, AppProps, DefaultAppIProps } from 'next/app';
import { ApolloProvider } from 'react-apollo';
import withApollo, { IApolloProps } from '../lib/withApollo';

class MyApp extends React.Component<
  IApolloProps & DefaultAppIProps & AppProps
> {
  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApollo(MyApp);
