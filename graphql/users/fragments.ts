import { gql } from 'apollo-boost';

export const UserInfoFragment = gql`
  fragment UserInfo on User {
    id
    email
  }
`;
