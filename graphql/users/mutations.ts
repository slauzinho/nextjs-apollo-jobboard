import { gql } from 'apollo-boost';
import { UserInfoFragment } from './fragments';

export const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        ...UserInfo
      }
    }
  }
  ${UserInfoFragment}
`;

export const SIGNUP_MUTATION = gql`
  mutation signup($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      user {
        ...UserInfo
      }
    }
  }
  ${UserInfoFragment}
`;

export const DELETE_MUTATION = gql`
  mutation deleteJob($id: ID!) {
    deleteJob(id: $id)
  }
`;
