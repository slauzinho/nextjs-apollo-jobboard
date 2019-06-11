import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { NextFunctionComponent } from 'next';

import initialize from '../lib/initialize';
import { IS_LOGGED_IN } from '../components/utils/myschema';
import { Query } from 'react-apollo';
import { IApolloProps, AppContext } from 'lib/withApollo';
import { IsUserLoggedIn } from '../../schemaTypes';

const Title = styled.h1`
  color: red;
  font-size: 50px;
`;

interface DefaultAppIProps {
  user:
    | {
        email: string;
        id: string;
      }
    | undefined;
}
const Index: NextFunctionComponent<
  IApolloProps & DefaultAppIProps,
  {},
  AppContext
> = props => (
  <Query<IsUserLoggedIn> query={IS_LOGGED_IN}>
    {({ data }) => (
      <div>
        <Title>My page</Title>
        <Link href="/">
          <a>Home</a>
        </Link>
        <br />
        <Link href="/register">
          <a>Create Account</a>
        </Link>
        <br />
        <Link href="/login">
          <a>Log-in</a>
        </Link>
        {data && data.isLoggedIn && <div>Logout</div>}
      </div>
    )}
  </Query>
);

Index.getInitialProps = async ctx => {
  initialize(ctx);
  return {};
};

export default Index;
