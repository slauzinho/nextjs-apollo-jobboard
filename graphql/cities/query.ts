import { gql } from 'apollo-boost';

export const CITIES_QUERY = gql`
  query Cities {
    cities {
      id
      name
      lat
      lng
      district
    }
  }
`;
