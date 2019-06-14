import { ApolloClient, NormalizedCacheObject } from 'apollo-boost';
import { ME_QUERY } from '../graphql/users/query';

export default (apolloClient: ApolloClient<NormalizedCacheObject>) =>
  apolloClient
    .query({
      query: ME_QUERY,
    })
    .then(({ data }) => {
      return { loggedInUser: data };
    })
    .catch(() => {
      // Fail gracefully
      return { loggedInUser: {} };
    });
