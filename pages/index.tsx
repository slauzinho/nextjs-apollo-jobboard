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
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignContent: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      maxWidth: '80rem',
      margin: '0 auto',
    }}
  >
    <Search cities={cities} />
    <History />
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
