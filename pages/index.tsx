import React from 'react';
import { NextFunctionComponent } from 'next';
import { AppContext } from '../lib/withApollo';
import { CITIES_QUERY } from '../graphql/cities/query';
import { CitiesQuery, City } from '../components/generated/apolloComponents';
import checkLoggedIn from '../lib/checkLoggedIn';
import Search from '../components/Search';
import History from '../components/History';

interface IProps {
  cities: City[];
}

const Index: NextFunctionComponent<IProps, IProps, AppContext> = ({
  cities,
}) => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <Search cities={cities} />
    <div>
      <h3>Pesquisas Anteriores</h3>
      <History />
    </div>
  </div>
);

Index.getInitialProps = async ctx => {
  await checkLoggedIn(ctx.apolloClient);
  const { data } = await ctx.apolloClient.query<CitiesQuery>({
    query: CITIES_QUERY,
  });

  return { cities: data.cities as City[] };
};

export default Index;
