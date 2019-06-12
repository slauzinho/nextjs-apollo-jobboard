import React from 'react';
import PropTypes from 'prop-types';
import { getDataFromTree } from 'react-apollo';
import Head from 'next/head';

import initApollo from './initApollo';
import {
  AppComponentType,
  DefaultAppIProps,
  NextAppContext,
  AppProps,
} from 'next/app';
import { NormalizedCacheObject, ApolloClient } from 'apollo-boost';
import { isBrowser } from './isBrowser';
import { DefaultQuery } from 'next/router';
import { NextContext } from 'next';

export interface IApolloProps {
  apolloState?: NormalizedCacheObject;
  apolloClient: ApolloClient<NormalizedCacheObject>;
}

export interface AppContext<Q extends DefaultQuery = DefaultQuery>
  extends NextContext<Q> {
  // Custom prop added by withApollo
  apolloClient: ApolloClient<any>;
}

export interface ApolloContext<Q extends DefaultQuery = DefaultQuery>
  extends NextAppContext<Q> {
  ctx: AppContext<Q>;
}

export default (App: AppComponentType<IApolloProps & DefaultAppIProps>) => {
  return class WithData extends React.Component<
    IApolloProps & AppProps & DefaultAppIProps
  > {
    static displayName = `WithData(${App.displayName})`;
    static propTypes = {
      apolloState: PropTypes.object.isRequired,
    };

    static async getInitialProps(ctx: ApolloContext) {
      const {
        Component,
        router,
        ctx: { req, res },
      } = ctx;

      const apollo = initApollo({});

      ctx.ctx.apolloClient = apollo;

      let appProps = {};
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(ctx);
      }

      if (res && res.finished) {
        // When redirecting, the response is finished.
        // No point in continuing to render
        return {};
      }

      if (!isBrowser) {
        // Run all graphql queries in the component tree
        // and extract the resulting data
        try {
          // Run all GraphQL queries
          await getDataFromTree(
            <App
              {...appProps}
              Component={Component}
              router={router}
              apolloClient={apollo}
              pageProps={{}}
            />
          );
        } catch (error) {
          // Prevent Apollo Client GraphQL errors from crashing SSR.
          // Handle them in components via the data.error prop:
          // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
          console.error('Error while running `getDataFromTree`', error);
        }

        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind();
      }

      // Extract query data from the Apollo's store
      const apolloState = apollo.cache.extract();

      return {
        ...appProps,
        apolloState,
      };
    }
    apolloClient: ApolloClient<NormalizedCacheObject>;

    constructor(props: IApolloProps & DefaultAppIProps & AppProps) {
      super(props);
      // `getDataFromTree` renders the component first, the client is passed off as a property.
      // After that rendering is done using Next's normal rendering pipeline
      this.apolloClient = initApollo(props.apolloState);
    }

    render() {
      return <App {...this.props} apolloClient={this.apolloClient} />;
    }
  };
};
