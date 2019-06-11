/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: IsUserLoggedIn
// ====================================================

export interface IsUserLoggedIn {
  isLoggedIn: boolean;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ILOGIN_MUTATION
// ====================================================

export interface ILOGIN_MUTATION_login_user {
  __typename: "User";
  email: string;
}

export interface ILOGIN_MUTATION_login {
  __typename: "AuthPayload";
  token: string;
  user: ILOGIN_MUTATION_login_user;
}

export interface ILOGIN_MUTATION {
  login: ILOGIN_MUTATION_login;
}

export interface ILOGIN_MUTATIONVariables {
  email: string;
  password: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Signup
// ====================================================

export interface Signup_signup_user {
  __typename: "User";
  email: string;
}

export interface Signup_signup {
  __typename: "AuthPayload";
  token: string;
  user: Signup_signup_user;
}

export interface Signup {
  signup: Signup_signup;
}

export interface SignupVariables {
  email: string;
  password: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
