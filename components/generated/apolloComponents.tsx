import gql from "graphql-tag";
import * as React from "react";
import * as ReactApollo from "react-apollo";
import * as ReactApolloHooks from "react-apollo-hooks";
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
  __typename?: "AuthPayload";
  token: Scalars["String"];
  user: User;
};

export type Category = {
  __typename?: "Category";
  id: Scalars["ID"];
  name: Scalars["String"];
  jobs: Array<Maybe<Job>>;
};

export type City = {
  __typename?: "City";
  id: Scalars["ID"];
  lat: Scalars["Float"];
  lng: Scalars["Float"];
  name: Scalars["String"];
  district: Scalars["String"];
};

export type Job = {
  __typename?: "Job";
  id: Scalars["ID"];
  slug: Scalars["String"];
  title: Scalars["String"];
  url?: Maybe<Scalars["String"]>;
  company: Scalars["String"];
  description: Scalars["String"];
  city: City;
  published_at?: Maybe<Scalars["String"]>;
  categories: Array<Category>;
  tags: Array<Maybe<Tag>>;
  status: Scalars["String"];
  shortDescription: Scalars["String"];
  email?: Maybe<Scalars["String"]>;
};

export type JobCreateInput = {
  title: Scalars["String"];
  url?: Maybe<Scalars["String"]>;
  company: Scalars["String"];
  description: Scalars["String"];
  city: Scalars["String"];
  categories: Array<Scalars["String"]>;
  tags: Array<Maybe<Scalars["String"]>>;
  email?: Maybe<Scalars["String"]>;
};

export type JobUpdateInput = {
  url?: Maybe<Scalars["String"]>;
  description: Scalars["String"];
  city: Scalars["String"];
  categories: Array<Scalars["String"]>;
  tags: Array<Maybe<Scalars["String"]>>;
  email?: Maybe<Scalars["String"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  signup: AuthPayload;
  login: AuthPayload;
  logout: Scalars["Boolean"];
  publish: Scalars["String"];
  unpublish: Job;
  createJob: Job;
  forgotPassword: Scalars["Boolean"];
  resetPassword: AuthPayload;
  updateJob: Job;
  deleteJob: Scalars["String"];
};

export type MutationSignupArgs = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type MutationLoginArgs = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type MutationPublishArgs = {
  id: Scalars["ID"];
};

export type MutationUnpublishArgs = {
  id: Scalars["ID"];
};

export type MutationCreateJobArgs = {
  input?: Maybe<JobCreateInput>;
};

export type MutationForgotPasswordArgs = {
  email: Scalars["String"];
};

export type MutationResetPasswordArgs = {
  input?: Maybe<ResetPasswordInput>;
};

export type MutationUpdateJobArgs = {
  id: Scalars["ID"];
  input: JobUpdateInput;
};

export type MutationDeleteJobArgs = {
  id: Scalars["ID"];
};

export type Query = {
  __typename?: "Query";
  me?: Maybe<User>;
  jobs: Array<Maybe<Job>>;
  pending: Array<Maybe<Job>>;
  categories: Array<Maybe<Category>>;
  tags: Array<Maybe<Tag>>;
  cities: Array<Maybe<City>>;
};

export type ResetPasswordInput = {
  resetToken: Scalars["String"];
  password: Scalars["String"];
  repeatPassword: Scalars["String"];
};

export type Tag = {
  __typename?: "Tag";
  id: Scalars["ID"];
  name: Scalars["String"];
  jobs: Array<Maybe<Job>>;
};

export type User = {
  __typename?: "User";
  id: Scalars["ID"];
  email: Scalars["String"];
  jobs: Array<Job>;
};
export type CategoriesQueryVariables = {};

export type CategoriesQuery = { __typename?: "Query" } & {
  categories: Array<
    Maybe<{ __typename?: "Category" } & Pick<Category, "id" | "name">>
  >;
};

export type CitiesQueryVariables = {};

export type CitiesQuery = { __typename?: "Query" } & {
  cities: Array<
    Maybe<
      { __typename?: "City" } & Pick<
        City,
        "id" | "name" | "lat" | "lng" | "district"
      >
    >
  >;
};

export type JobInfoFragment = { __typename?: "Job" } & Pick<
  Job,
  | "id"
  | "slug"
  | "title"
  | "email"
  | "url"
  | "company"
  | "description"
  | "shortDescription"
  | "published_at"
  | "status"
> & {
    city: { __typename?: "City" } & Pick<City, "id" | "name">;
    categories: Array<
      { __typename?: "Category" } & Pick<Category, "id" | "name">
    >;
    tags: Array<Maybe<{ __typename?: "Tag" } & Pick<Tag, "id" | "name">>>;
  };

export type JobCreateMutationVariables = {
  input?: Maybe<JobCreateInput>;
};

export type JobCreateMutation = { __typename?: "Mutation" } & {
  createJob: { __typename?: "Job" } & JobInfoFragment;
};

export type TagsQueryVariables = {};

export type TagsQuery = { __typename?: "Query" } & {
  tags: Array<Maybe<{ __typename?: "Tag" } & Pick<Tag, "id" | "name">>>;
};

export type UserInfoFragment = { __typename?: "User" } & Pick<
  User,
  "id" | "email"
>;

export type LogoutMutationVariables = {};

export type LogoutMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "logout"
>;

export type LoginMutationVariables = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type LoginMutation = { __typename?: "Mutation" } & {
  login: { __typename?: "AuthPayload" } & {
    user: { __typename?: "User" } & UserInfoFragment;
  };
};

export type SignupMutationVariables = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type SignupMutation = { __typename?: "Mutation" } & {
  signup: { __typename?: "AuthPayload" } & {
    user: { __typename?: "User" } & UserInfoFragment;
  };
};

export type DeleteJobMutationVariables = {
  id: Scalars["ID"];
};

export type DeleteJobMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "deleteJob"
>;

export type MeQueryVariables = {};

export type MeQuery = { __typename?: "Query" } & {
  me: Maybe<
    { __typename?: "User" } & {
      jobs: Array<{ __typename?: "Job" } & JobInfoFragment>;
    } & UserInfoFragment
  >;
};
export const JobInfoFragmentDoc = gql`
  fragment JobInfo on Job {
    id
    slug
    title
    email
    url
    company
    description
    shortDescription
    city {
      id
      name
    }
    published_at
    categories {
      id
      name
    }
    tags {
      id
      name
    }
    status
  }
`;
export const UserInfoFragmentDoc = gql`
  fragment UserInfo on User {
    id
    email
  }
`;
export const CategoriesDocument = gql`
  query Categories {
    categories {
      id
      name
    }
  }
`;
export type CategoriesComponentProps = Omit<
  ReactApollo.QueryProps<CategoriesQuery, CategoriesQueryVariables>,
  "query"
>;

export const CategoriesComponent = (props: CategoriesComponentProps) => (
  <ReactApollo.Query<CategoriesQuery, CategoriesQueryVariables>
    query={CategoriesDocument}
    {...props}
  />
);

export type CategoriesProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<CategoriesQuery, CategoriesQueryVariables>
> &
  TChildProps;
export function withCategories<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    CategoriesQuery,
    CategoriesQueryVariables,
    CategoriesProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    CategoriesQuery,
    CategoriesQueryVariables,
    CategoriesProps<TChildProps>
  >(CategoriesDocument, {
    alias: "withCategories",
    ...operationOptions
  });
}

export function useCategoriesQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<CategoriesQueryVariables>
) {
  return ReactApolloHooks.useQuery<CategoriesQuery, CategoriesQueryVariables>(
    CategoriesDocument,
    baseOptions
  );
}
export const CitiesDocument = gql`
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
export type CitiesComponentProps = Omit<
  ReactApollo.QueryProps<CitiesQuery, CitiesQueryVariables>,
  "query"
>;

export const CitiesComponent = (props: CitiesComponentProps) => (
  <ReactApollo.Query<CitiesQuery, CitiesQueryVariables>
    query={CitiesDocument}
    {...props}
  />
);

export type CitiesProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<CitiesQuery, CitiesQueryVariables>
> &
  TChildProps;
export function withCities<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    CitiesQuery,
    CitiesQueryVariables,
    CitiesProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    CitiesQuery,
    CitiesQueryVariables,
    CitiesProps<TChildProps>
  >(CitiesDocument, {
    alias: "withCities",
    ...operationOptions
  });
}

export function useCitiesQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<CitiesQueryVariables>
) {
  return ReactApolloHooks.useQuery<CitiesQuery, CitiesQueryVariables>(
    CitiesDocument,
    baseOptions
  );
}
export const JobCreateDocument = gql`
  mutation jobCreate($input: JobCreateInput) {
    createJob(input: $input) {
      ...JobInfo
    }
  }
  ${JobInfoFragmentDoc}
`;
export type JobCreateMutationFn = ReactApollo.MutationFn<
  JobCreateMutation,
  JobCreateMutationVariables
>;
export type JobCreateComponentProps = Omit<
  ReactApollo.MutationProps<JobCreateMutation, JobCreateMutationVariables>,
  "mutation"
>;

export const JobCreateComponent = (props: JobCreateComponentProps) => (
  <ReactApollo.Mutation<JobCreateMutation, JobCreateMutationVariables>
    mutation={JobCreateDocument}
    {...props}
  />
);

export type JobCreateProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<JobCreateMutation, JobCreateMutationVariables>
> &
  TChildProps;
export function withJobCreate<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    JobCreateMutation,
    JobCreateMutationVariables,
    JobCreateProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    JobCreateMutation,
    JobCreateMutationVariables,
    JobCreateProps<TChildProps>
  >(JobCreateDocument, {
    alias: "withJobCreate",
    ...operationOptions
  });
}

export function useJobCreateMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    JobCreateMutation,
    JobCreateMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    JobCreateMutation,
    JobCreateMutationVariables
  >(JobCreateDocument, baseOptions);
}
export const TagsDocument = gql`
  query Tags {
    tags {
      id
      name
    }
  }
`;
export type TagsComponentProps = Omit<
  ReactApollo.QueryProps<TagsQuery, TagsQueryVariables>,
  "query"
>;

export const TagsComponent = (props: TagsComponentProps) => (
  <ReactApollo.Query<TagsQuery, TagsQueryVariables>
    query={TagsDocument}
    {...props}
  />
);

export type TagsProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<TagsQuery, TagsQueryVariables>
> &
  TChildProps;
export function withTags<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    TagsQuery,
    TagsQueryVariables,
    TagsProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    TagsQuery,
    TagsQueryVariables,
    TagsProps<TChildProps>
  >(TagsDocument, {
    alias: "withTags",
    ...operationOptions
  });
}

export function useTagsQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<TagsQueryVariables>
) {
  return ReactApolloHooks.useQuery<TagsQuery, TagsQueryVariables>(
    TagsDocument,
    baseOptions
  );
}
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
  "mutation"
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
    alias: "withLogout",
    ...operationOptions
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
        ...UserInfo
      }
    }
  }
  ${UserInfoFragmentDoc}
`;
export type LoginMutationFn = ReactApollo.MutationFn<
  LoginMutation,
  LoginMutationVariables
>;
export type LoginComponentProps = Omit<
  ReactApollo.MutationProps<LoginMutation, LoginMutationVariables>,
  "mutation"
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
    alias: "withLogin",
    ...operationOptions
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
        ...UserInfo
      }
    }
  }
  ${UserInfoFragmentDoc}
`;
export type SignupMutationFn = ReactApollo.MutationFn<
  SignupMutation,
  SignupMutationVariables
>;
export type SignupComponentProps = Omit<
  ReactApollo.MutationProps<SignupMutation, SignupMutationVariables>,
  "mutation"
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
    alias: "withSignup",
    ...operationOptions
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
export const DeleteJobDocument = gql`
  mutation deleteJob($id: ID!) {
    deleteJob(id: $id)
  }
`;
export type DeleteJobMutationFn = ReactApollo.MutationFn<
  DeleteJobMutation,
  DeleteJobMutationVariables
>;
export type DeleteJobComponentProps = Omit<
  ReactApollo.MutationProps<DeleteJobMutation, DeleteJobMutationVariables>,
  "mutation"
>;

export const DeleteJobComponent = (props: DeleteJobComponentProps) => (
  <ReactApollo.Mutation<DeleteJobMutation, DeleteJobMutationVariables>
    mutation={DeleteJobDocument}
    {...props}
  />
);

export type DeleteJobProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<DeleteJobMutation, DeleteJobMutationVariables>
> &
  TChildProps;
export function withDeleteJob<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    DeleteJobMutation,
    DeleteJobMutationVariables,
    DeleteJobProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    DeleteJobMutation,
    DeleteJobMutationVariables,
    DeleteJobProps<TChildProps>
  >(DeleteJobDocument, {
    alias: "withDeleteJob",
    ...operationOptions
  });
}

export function useDeleteJobMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    DeleteJobMutation,
    DeleteJobMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    DeleteJobMutation,
    DeleteJobMutationVariables
  >(DeleteJobDocument, baseOptions);
}
export const MeDocument = gql`
  query Me {
    me {
      ...UserInfo
      jobs {
        ...JobInfo
      }
    }
  }
  ${UserInfoFragmentDoc}
  ${JobInfoFragmentDoc}
`;
export type MeComponentProps = Omit<
  ReactApollo.QueryProps<MeQuery, MeQueryVariables>,
  "query"
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
    alias: "withMe",
    ...operationOptions
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
