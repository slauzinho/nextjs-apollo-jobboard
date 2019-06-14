import React from 'react';
import { NextFunctionComponent } from 'next';
import { Formik, Field, Form, FieldProps } from 'formik';
import { AppContext, IApolloProps } from '../lib/withApollo';
import {
  LoginMutationVariables,
  useLoginMutation,
  MeQuery,
} from '../components/generated/apolloComponents';
import Router from 'next/router';

const Login: NextFunctionComponent<IApolloProps, {}, AppContext> = () => {
  const login = useLoginMutation({
    update: async (cache, { data }) => {
      if (!data && !data.login) {
        return null;
      }
      await cache.writeData<MeQuery>({
        data: {
          me: data.login.user,
        },
      });
    },
  });
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={async ({ email, password }, actions) => {
        actions.setSubmitting(true);
        const response = await login({ variables: { email, password } });
        if (response && response.data && response.data.login) {
          Router.push('/');
        }
        actions.setSubmitting(false);
      }}
    >
      {() => (
        <div>
          <h1>Login</h1>
          <Form method="POST">
            <Field
              name="email"
              render={({ field, form }: FieldProps<LoginMutationVariables>) => (
                <div>
                  <input type="email" {...field} placeholder="email" />
                  {form.touched.email && form.errors.email}
                </div>
              )}
            />
            <Field
              name="password"
              render={({ field, form }: FieldProps<LoginMutationVariables>) => (
                <div>
                  <input type="password" {...field} placeholder="password" />
                  {form.touched.password && form.errors.password}
                </div>
              )}
            />
            <button type="submit">Login</button>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default Login;
