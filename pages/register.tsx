import React from 'react';
import { Formik, FormikActions, Form, Field, FieldProps } from 'formik';
import { NextFunctionComponent } from 'next';
import { gql } from 'apollo-boost';

import { AppContext, IApolloProps } from '../lib/withApollo';
import {
  SignupComponent,
  SignupMutationVariables,
} from '../components/generated/apolloComponents';

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
  <SignupComponent>
    {(register, { error, loading }) => (
      <div>
        <h1>Register</h1>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={async (
            { email, password }: SignupMutationVariables,
            actions: FormikActions<SignupMutationVariables>
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
                render={({
                  field,
                  form,
                }: FieldProps<SignupMutationVariables>) => (
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
                }: FieldProps<SignupMutationVariables>) => (
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
  </SignupComponent>
);

Register.getInitialProps = async ctx => {
  return {};
};

export default Register;
