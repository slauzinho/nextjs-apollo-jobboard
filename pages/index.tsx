import React, { useState } from 'react';
import { NextFunctionComponent } from 'next';
import Link from 'next/link';
import CityInput from '../components/CityInput';
import { AppContext } from '../lib/withApollo';
import { CITIES_QUERY } from '../graphql/cities/query';
import { CitiesQuery, City } from '../components/generated/apolloComponents';
import Input from '../components/styles/components/Input';
import checkLoggedIn from '../lib/checkLoggedIn';
import { saveHistory } from '../lib/history';
import Router from 'next/router';

interface IProps {
  cities: City[];
}

const Index: NextFunctionComponent<IProps, IProps, AppContext> = ({
  cities,
}) => {
  const [city, setCity] = useState<City>();
  const [job, setJob] = useState<string>();
  const handleClick = async () => {
    if (job && city) {
      await saveHistory(job, city.name);
    }
    Router.push({
      pathname: '/jobs',
      query: { job, city: city ? city.name : '' },
    });
  };

  return (
    <div style={{ display: 'flex' }}>
      <Input onChange={e => setJob(e.target.value)} />
      <CityInput
        cities={cities}
        handleChange={selectedCity => setCity(selectedCity)}
      />

      <a onClick={handleClick}>Procurar</a>
    </div>
  );
};

Index.getInitialProps = async ctx => {
  await checkLoggedIn(ctx.apolloClient);
  const { data } = await ctx.apolloClient.query<CitiesQuery>({
    query: CITIES_QUERY,
  });

  return { cities: data.cities as City[] };
};

export default Index;
