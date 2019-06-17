import { gql } from 'apollo-boost';

export const TAGS_QUERY = gql`
  query Tags {
    tags {
      id
      name
    }
  }
`;
