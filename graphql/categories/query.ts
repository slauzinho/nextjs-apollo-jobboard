import { gql } from 'apollo-boost';

export const CATEGORIES_QUERY = gql`
  query Categories {
    categories {
      id
      name
    }
  }
`;
