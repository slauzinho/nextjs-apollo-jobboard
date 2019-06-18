import React, { useState } from 'react';
import { NextFunctionComponent } from 'next';
import CityInput from '../components/CityInput';
import { AppContext } from '../lib/withApollo';
import { CITIES_QUERY } from '../graphql/cities/query';
import { CitiesQuery, City } from '../components/generated/apolloComponents';
import Input from '../components/styles/components/Input';
import Link from 'next/link';

interface IProps {
  cities: City[];
}

const Index: NextFunctionComponent<IProps, IProps, AppContext> = ({
  cities,
}) => {
  const [city, setCity] = useState<City>();
  const [job, setJob] = useState<string>();

  return (
    <div style={{ display: 'flex' }}>
      <Input onChange={e => setJob(e.target.value)} />
      <CityInput cities={cities} handleChange={setCity} />
      <Link
        href={{
          pathname: '/jobs',
          query: { job, city: city ? city.name : '' },
        }}
      >
        <a>Procurar</a>
      </Link>
    </div>
  );
};

Index.getInitialProps = async ctx => {
  const { data } = await ctx.apolloClient.query<CitiesQuery>({
    query: CITIES_QUERY,
  });

  return { cities: data.cities as City[] };
};

export default Index;
