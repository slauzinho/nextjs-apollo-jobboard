import { gql } from 'apollo-boost';

export const CityInfoFragment = gql`
  fragment CityInfo on City {
    id
    name
    lat
    lng
    district
  }
`;
