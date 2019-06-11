import React from 'react';
import { NextFunctionComponent } from 'next';
import { Formik, Field, Form, FieldProps } from 'formik';
import { gql } from 'apollo-boost';
import { Mutation } from 'react-apollo';
import redirect from '../lib/redirect';
import { AppContext, IApolloProps } from '../lib/withApollo';
import initialize from '../lib/initialize';
import { ILOGIN_MUTATION, ILOGIN_MUTATIONVariables } from '../../schemaTypes';

const LOGIN_MUTATION = gql`
  mutation ILOGIN_MUTATION($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        email
      }
    }
  }
`;

const Login: NextFunctionComponent<IApolloProps, {}, AppContext> = ({
  apolloClient,
}) => (
  <Mutation<ILOGIN_MUTATION, ILOGIN_MUTATIONVariables>
    mutation={LOGIN_MUTATION}
    onCompleted={() => {
      apolloClient.cache.reset().then(() => {
        redirect({} as any, '/');
      });
    }}
  >
    {(login, { error, loading }) => (
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={async ({ email, password }, actions) => {
          actions.setSubmitting(true);
          await login({ variables: { email, password } });
          actions.setSubmitting(false);
        }}
      >
        {() => (
          <div>
            <h1>Login</h1>
            <Form method="POST">
              <Field
                name="email"
                render={({
                  field,
                  form,
                }: FieldProps<ILOGIN_MUTATIONVariables>) => (
                  <div>
                    <input type="email" {...field} placeholder="email" />
                    {form.touched.email && form.errors.email}
                  </div>
                )}
              />
              <Field
                name="password"
                render={({
                  field,
                  form,
                }: FieldProps<ILOGIN_MUTATIONVariables>) => (
                  <div>
                    <input type="password" {...field} placeholder="password" />
                    {form.touched.password && form.errors.password}
                  </div>
                )}
              />
              <button type="submit" disabled={loading} aria-busy={loading}>
                Login
              </button>
              {error && <div>Email ou Password errados</div>}
            </Form>
          </div>
        )}
      </Formik>
    )}
  </Mutation>
);

Login.getInitialProps = async ctx => {
  await initialize(ctx);
  return {};
};

export default Login;
