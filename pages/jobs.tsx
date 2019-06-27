import React, { useState } from 'react';
import { InstantSearch, Configure } from 'react-instantsearch-dom';
import { NextFunctionComponent } from 'next';
import { AppContext } from '../lib/withApollo';
import {
  City,
  CityQuery,
  CitiesQuery,
} from '../components/generated/apolloComponents';
import { CITY_QUERY, CITIES_QUERY } from '../graphql/cities/query';
import Hits from '../components/Algolia/Hits';
import Menu from '../components/Algolia/Menu';
import Pagination from '../components/Algolia/Pagination';
import JobDetailsPublic from '../components/JobDetailsPublic';
import Search from '../components/Search';

const transformCityLatLng = (city: City | null) => {
  if (!city) {
    return '';
  }
  return `${city.lat}, ${city.lng}`;
};

interface IProps {
  job?: string;
  city?: City | null;
  cities: City[];
}

const Jobs: NextFunctionComponent<IProps, IProps, AppContext> = ({
  job = '',
  city = null,
  cities,
}) => {
  const [activeID, setactiveID] = useState('');

  const resetID = () => setactiveID('');
  return (
    <div>
      <Search cities={cities} />
      <InstantSearch
        apiKey="bfe227c5812014984dd8e7ed3cef7288"
        appId="LOH2BCM465"
        indexName="jobs_index"
      >
        <Configure
          hitsPerPage={8}
          query={job}
          aroundLatLng={transformCityLatLng(city)}
          aroundRadius="40000"
        />
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          <div>
            <Menu attribute={'city'} title="Localidades" />
            <Menu attribute={'categories'} title="Tipo" />
          </div>

          <div>
            <Hits handleClick={setactiveID} />
            <Pagination />
          </div>

          {activeID && (
            <JobDetailsPublic
              id={activeID}
              key={activeID}
              closeEditor={() => resetID()}
            />
          )}
        </div>
      </InstantSearch>
    </div>
  );
};

Jobs.getInitialProps = async ctx => {
  const { job, city } = ctx.query;
  try {
    const { data } = await ctx.apolloClient.query<CityQuery>({
      query: CITY_QUERY,
      variables: { name: city },
    });

    const { data: dataCities } = await ctx.apolloClient.query<CitiesQuery>({
      query: CITIES_QUERY,
    });

    if (data && dataCities) {
      return {
        job: job as string | undefined,
        city: data.city as City,
        cities: dataCities.cities as City[],
      };
    }
    return { job: job as string | undefined, cities: [] };
  } catch {
    return { job: job as string | undefined, cities: [] };
  }
};

export default Jobs;
