import { gql } from 'apollo-boost';
import { CityInfoFragment } from './fragments';

export const CITIES_QUERY = gql`
  query Cities {
    cities {
      ...CityInfo
    }
  }
  ${CityInfoFragment}
`;

export const CITY_QUERY = gql`
  query City($id: ID, $name: String) {
    city(id: $id, name: $name) {
      ...CityInfo
    }
  }
  ${CityInfoFragment}
`;
