import { gql } from 'apollo-boost';

export const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
        email
      }
    }
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation signup($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      user {
        id
        email
      }
    }
  }
`;
