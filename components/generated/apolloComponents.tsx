import gql from 'graphql-tag';
import * as ReactApollo from 'react-apollo';
import * as React from 'react';
import * as ReactApolloHooks from 'react-apollo-hooks';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String'];
  user: User;
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['ID'];
  name: Scalars['String'];
  jobs?: Maybe<Array<Maybe<Job>>>;
};

export type City = {
  __typename?: 'City';
  id: Scalars['ID'];
  lat: Scalars['Float'];
  lng: Scalars['Float'];
  name: Scalars['String'];
  district: Scalars['String'];
};

export type Job = {
  __typename?: 'Job';
  id: Scalars['ID'];
  slug: Scalars['String'];
  title: Scalars['String'];
  url?: Maybe<Scalars['String']>;
  company: Scalars['String'];
  description: Scalars['String'];
  city: City;
  published_at?: Maybe<Scalars['String']>;
  categories: Array<Category>;
  tags: Array<Maybe<Tag>>;
  status: Scalars['String'];
};

export type JobCreateInput = {
  title: Scalars['String'];
  url?: Maybe<Scalars['String']>;
  company: Scalars['String'];
  description: Scalars['String'];
  city: Scalars['String'];
  categories: Array<Scalars['String']>;
  tags: Array<Maybe<Scalars['String']>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  signup: AuthPayload;
  login: AuthPayload;
  logout: Scalars['Boolean'];
  publish: Scalars['String'];
  unpublish: Job;
  createJob: Job;
  forgotPassword: Scalars['Boolean'];
  resetPassword: AuthPayload;
};

export type MutationSignupArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type MutationPublishArgs = {
  id: Scalars['ID'];
};

export type MutationUnpublishArgs = {
  id: Scalars['ID'];
};

export type MutationCreateJobArgs = {
  input?: Maybe<JobCreateInput>;
};

export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};

export type MutationResetPasswordArgs = {
  input?: Maybe<ResetPasswordInput>;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  jobs: Array<Maybe<Job>>;
  pending: Array<Maybe<Job>>;
};

export type ResetPasswordInput = {
  resetToken: Scalars['String'];
  password: Scalars['String'];
  repeatPassword: Scalars['String'];
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['ID'];
  name: Scalars['String'];
  jobs?: Maybe<Array<Maybe<Job>>>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  email: Scalars['String'];
  jobs: Array<Maybe<Job>>;
};
export type LogoutMutationVariables = {};

export type LogoutMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'logout'
>;

export type LoginMutationVariables = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginMutation = { __typename?: 'Mutation' } & {
  login: { __typename?: 'AuthPayload' } & {
    user: { __typename?: 'User' } & Pick<User, 'id' | 'email'>;
  };
};

export type SignupMutationVariables = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type SignupMutation = { __typename?: 'Mutation' } & {
  signup: { __typename?: 'AuthPayload' } & {
    user: { __typename?: 'User' } & Pick<User, 'id' | 'email'>;
  };
};

export type MeQueryVariables = {};

export type MeQuery = { __typename?: 'Query' } & {
  me: Maybe<{ __typename?: 'User' } & Pick<User, 'email' | 'id'>>;
};

export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;
export type LogoutMutationFn = ReactApollo.MutationFn<
  LogoutMutation,
  LogoutMutationVariables
>;
export type LogoutComponentProps = Omit<
  ReactApollo.MutationProps<LogoutMutation, LogoutMutationVariables>,
  'mutation'
>;

export const LogoutComponent = (props: LogoutComponentProps) => (
  <ReactApollo.Mutation<LogoutMutation, LogoutMutationVariables>
    mutation={LogoutDocument}
    {...props}
  />
);

export type LogoutProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<LogoutMutation, LogoutMutationVariables>
> &
  TChildProps;
export function withLogout<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    LogoutMutation,
    LogoutMutationVariables,
    LogoutProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    LogoutMutation,
    LogoutMutationVariables,
    LogoutProps<TChildProps>
  >(LogoutDocument, {
    alias: 'withLogout',
    ...operationOptions,
  });
}

export function useLogoutMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    LogoutMutation,
    LogoutMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument,
    baseOptions
  );
}
export const LoginDocument = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
        email
      }
    }
  }
`;
export type LoginMutationFn = ReactApollo.MutationFn<
  LoginMutation,
  LoginMutationVariables
>;
export type LoginComponentProps = Omit<
  ReactApollo.MutationProps<LoginMutation, LoginMutationVariables>,
  'mutation'
>;

export const LoginComponent = (props: LoginComponentProps) => (
  <ReactApollo.Mutation<LoginMutation, LoginMutationVariables>
    mutation={LoginDocument}
    {...props}
  />
);

export type LoginProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<LoginMutation, LoginMutationVariables>
> &
  TChildProps;
export function withLogin<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    LoginMutation,
    LoginMutationVariables,
    LoginProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    LoginMutation,
    LoginMutationVariables,
    LoginProps<TChildProps>
  >(LoginDocument, {
    alias: 'withLogin',
    ...operationOptions,
  });
}

export function useLoginMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    baseOptions
  );
}
export const SignupDocument = gql`
  mutation signup($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      user {
        id
        email
      }
    }
  }
`;
export type SignupMutationFn = ReactApollo.MutationFn<
  SignupMutation,
  SignupMutationVariables
>;
export type SignupComponentProps = Omit<
  ReactApollo.MutationProps<SignupMutation, SignupMutationVariables>,
  'mutation'
>;

export const SignupComponent = (props: SignupComponentProps) => (
  <ReactApollo.Mutation<SignupMutation, SignupMutationVariables>
    mutation={SignupDocument}
    {...props}
  />
);

export type SignupProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<SignupMutation, SignupMutationVariables>
> &
  TChildProps;
export function withSignup<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    SignupMutation,
    SignupMutationVariables,
    SignupProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    SignupMutation,
    SignupMutationVariables,
    SignupProps<TChildProps>
  >(SignupDocument, {
    alias: 'withSignup',
    ...operationOptions,
  });
}

export function useSignupMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    SignupMutation,
    SignupMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<SignupMutation, SignupMutationVariables>(
    SignupDocument,
    baseOptions
  );
}
export const MeDocument = gql`
  query Me {
    me {
      email
      id
    }
  }
`;
export type MeComponentProps = Omit<
  ReactApollo.QueryProps<MeQuery, MeQueryVariables>,
  'query'
>;

export const MeComponent = (props: MeComponentProps) => (
  <ReactApollo.Query<MeQuery, MeQueryVariables> query={MeDocument} {...props} />
);

export type MeProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<MeQuery, MeQueryVariables>
> &
  TChildProps;
export function withMe<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    MeQuery,
    MeQueryVariables,
    MeProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    MeQuery,
    MeQueryVariables,
    MeProps<TChildProps>
  >(MeDocument, {
    alias: 'withMe',
    ...operationOptions,
  });
}

export function useMeQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<MeQueryVariables>
) {
  return ReactApolloHooks.useQuery<MeQuery, MeQueryVariables>(
    MeDocument,
    baseOptions
  );
}
