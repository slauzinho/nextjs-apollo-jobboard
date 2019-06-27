import React, { useState } from 'react';
import Router from 'next/router';
import { saveHistory } from '../../lib/history';
import CityInput from '../CityInput';
import Input from '../styles/components/Input';
import { City } from '../generated/apolloComponents';

interface IProps {
  cities: City[];
}

const Search: React.FC<IProps> = ({ cities }) => {
  const [city, setcity] = useState<City>();
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
        handleChange={selectedCity => setcity(selectedCity)}
      />

      <a onClick={handleClick}>Procurar</a>
    </div>
  );
};

export default Search;
