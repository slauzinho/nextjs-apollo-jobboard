import { gql } from 'apollo-boost';

export const ME_QUERY = gql`
  query Me {
    me {
      id
      email
    }
  }
`;
