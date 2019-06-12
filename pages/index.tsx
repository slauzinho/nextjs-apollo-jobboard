import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { NextFunctionComponent } from 'next';
import { IApolloProps, AppContext } from '../lib/withApollo';
import {
  useLogoutMutation,
  useMeQuery,
} from '../components/generated/apolloComponents';
import { ApolloClient } from 'apollo-boost';

const Title = styled.h1`
  color: red;
  font-size: 50px;
`;

//@ts-ignore
interface DefaultAppIProps {
  client: ApolloClient<any>;
}
const Index: NextFunctionComponent<IApolloProps, any, AppContext> = props => {
  const logout = useLogoutMutation();
  const { data, refetch } = useMeQuery({ errorPolicy: 'all' });
  return (
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
      {data && data.me && (
        <div
          onClick={async () => {
            await logout();
            await refetch();
          }}
        >
          Logout
        </div>
      )}
    </div>
  );
};

Index.getInitialProps = async ctx => {
  return {};
};

export default Index;
