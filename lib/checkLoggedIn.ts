import { gql, ApolloClient, NormalizedCacheObject } from 'apollo-boost';

export default (apolloClient: ApolloClient<NormalizedCacheObject>) =>
  apolloClient
    .query({
      query: gql`
        query Me {
          me {
            id
            email
          }
        }
      `,
    })
    .then(({ data, errors }) => {
      return { loggedInUser: data };
    })
    .catch(() => {
      // Fail gracefully
      return { loggedInUser: {} };
    });
