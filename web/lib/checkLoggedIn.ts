import { gql, ApolloClient, NormalizedCacheObject } from 'apollo-boost';

export default (apolloClient: ApolloClient<NormalizedCacheObject>) =>
  apolloClient
    .query({
      query: gql`
        query getUser {
          me {
            id
            email
          }
        }
      `,
    })
    .then(({ data }) => {
      return { loggedInUser: data };
    })
    .catch(() => {
      // Fail gracefully
      return { loggedInUser: {} };
    });
