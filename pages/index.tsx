import React from 'react';
import styled from 'styled-components';
import { NextFunctionComponent } from 'next';
import { IApolloProps, AppContext } from '../lib/withApollo';
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
  return (
    <div>
      <Title>My page</Title>
    </div>
  );
};

Index.getInitialProps = async ctx => {
  return {};
};

export default Index;
