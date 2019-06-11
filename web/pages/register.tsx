import React from 'react';
import { Formik, FormikActions, Form, Field, FieldProps } from 'formik';
import { NextFunctionComponent } from 'next';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import { Signup, SignupVariables } from '../../schemaTypes';

import { AppContext, IApolloProps } from '../lib/withApollo';
import initialize from '../lib/initialize';

export const REGISTER_MUTATION = gql`
  mutation Signup($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      token
      user {
        email
      }
    }
  }
`;

const Register: NextFunctionComponent<IApolloProps, {}, AppContext> = () => (
  <Mutation<Signup, SignupVariables> mutation={REGISTER_MUTATION}>
    {(register, { error, loading }) => (
      <div>
        <h1>Register</h1>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={async (
            { email, password }: SignupVariables,
            actions: FormikActions<SignupVariables>
          ) => {
            try {
              actions.setSubmitting(true);
              await register({ variables: { email, password } });
              actions.setSubmitting(false);
            } catch (e) {
              actions.setSubmitting(false);
            }
          }}
        >
          {() => (
            <Form method="POST">
              <Field
                name="email"
                render={({ field, form }: FieldProps<SignupVariables>) => (
                  <div>
                    <input type="email" {...field} placeholder="email" />
                    {form.touched.email && form.errors.email}
                  </div>
                )}
              />
              <Field
                name="password"
                render={({ field, form }: FieldProps<SignupVariables>) => (
                  <div>
                    <input type="password" {...field} placeholder="password" />
                    {form.touched.password && form.errors.password}
                  </div>
                )}
              />
              <button type="submit" disabled={loading} aria-busy={loading}>
                Register Account
              </button>
              {error && <div>Email já existe</div>}
            </Form>
          )}
        </Formik>
      </div>
    )}
  </Mutation>
);

Register.getInitialProps = async ctx => {
  initialize(ctx);
  return {};
};

export default Register;
