import React from 'react';
import { NextFunctionComponent } from 'next';
import { useMeQuery } from '../components/generated/apolloComponents';
import Jobs from '../components/Jobs';
import checkLoggedIn from '../lib/checkLoggedIn';
import { Context } from 'react-apollo/types';
import { orderByStatus } from '../components/utils';

const Index: NextFunctionComponent = () => {
  const { data } = useMeQuery({ errorPolicy: 'all' });
  if (data && data.me && data.me.jobs) {
    const sortedJobs = orderByStatus(data.me.jobs);
    return (
      <div>
        <Jobs jobs={sortedJobs} />
      </div>
    );
  }
  // TODO: Refactor to a nicer component
  return <div>Ups! Parece que ainda não criaste nenhum anuncio.</div>;
};

Index.getInitialProps = async (ctx: Context) => {
  await checkLoggedIn(ctx.apolloClient);
  return {};
};
export default Index;
