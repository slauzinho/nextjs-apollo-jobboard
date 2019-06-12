import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from 'apollo-boost';
import { createHttpLink } from 'apollo-link-http';
import fetch from 'isomorphic-unfetch';
import { isBrowser } from './isBrowser';
import { onError } from 'apollo-link-error';

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

if (!isBrowser) {
  // @ts-ignore
  global.fetch = fetch;
}

function create(initialState: any) {
  const httpLink = createHttpLink({
    uri: 'http://localhost:4000',
    credentials: 'include',
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );
    if (networkError) console.log(`[Network error]: ${networkError}`);
  });

  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser, // Disables forceFetch on the server (so queries are only run once)
    link: errorLink.concat(httpLink),
    cache: new InMemoryCache().restore(initialState || {}),
  });
}

export default function initApollo(initialState: any) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!isBrowser) {
    return create(initialState);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState);
  }

  return apolloClient;
}
