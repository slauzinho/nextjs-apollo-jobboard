import React, { useState, useEffect } from 'react';
import { NextFunctionComponent } from 'next';
import Link from 'next/link';
import CityInput from '../components/CityInput';
import { AppContext } from '../lib/withApollo';
import { CITIES_QUERY } from '../graphql/cities/query';
import { CitiesQuery, City } from '../components/generated/apolloComponents';
import Input from '../components/styles/components/Input';
import checkLoggedIn from '../lib/checkLoggedIn';
import { saveHistory, getHistory, IHistory } from '../lib/history';
import Router from 'next/router';

interface IProps {
  cities: City[];
}

const Index: NextFunctionComponent<IProps, IProps, AppContext> = ({
  cities,
}) => {
  const [city, setCity] = useState<City>();
  const [job, setJob] = useState<string>();
  const [history, setHistory] = useState<IHistory[]>();

  const handleClick = async () => {
    if (job && city) {
      await saveHistory(job, city.name);
    }
    Router.push({
      pathname: '/jobs',
      query: { job, city: city ? city.name : '' },
    });
  };

  useEffect(() => {
    async function get() {
      const savedHistory = await getHistory();
      setHistory(savedHistory);
    }
    get();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex' }}>
        <Input onChange={e => setJob(e.target.value)} />
        <CityInput
          cities={cities}
          handleChange={selectedCity => setCity(selectedCity)}
        />

        <a onClick={handleClick}>Procurar</a>
      </div>
      <div>
        <h3>Pesquisas Anteriores</h3>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          {history &&
            history.map(({ job: jobItem, city: cityItem }: IHistory, index) => {
              return (
                <Link key={index} href={`jobs?job=${jobItem}&city=${cityItem}`}>
                  <a>
                    {jobItem} - {cityItem}
                  </a>
                </Link>
              );
            })}
        </div>
      </div>
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
