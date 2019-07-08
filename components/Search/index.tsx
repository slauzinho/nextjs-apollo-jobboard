import React, { useState } from 'react';
import Router from 'next/router';
import { saveHistory } from '../../lib/history';
import CityInput from '../CityInput';
import Input from '../styles/components/Input';
import { City } from '../generated/apolloComponents';
import { JobSearchContainer, Container, InputContainer } from './styles';
import Button from '../styles/components/Button';

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
    <Container>
      <JobSearchContainer>
        <div id="jobLabels">
          <label htmlFor="job-search">O que procuras?</label>
          <label>Profissão, Titulo, Tech, etc...</label>
        </div>
        <InputContainer>
          <Input
            onChange={e => setJob(e.target.value)}
            id="job-search"
            aria-labelledby="jobLabels"
          />
          <svg width={25} height={25}>
            <path
              d="M19.88 9.938C19.88 4.447 15.427 0 9.94 0 4.45 0 .002 4.449 0 9.938c.002 5.491 4.45 9.938 9.94 9.938 2.503 0 4.765-.958 6.514-2.486L24.06 25l.94-.94-7.606-7.61c1.53-1.747 2.486-4.007 2.486-6.512zm-9.94 8.61A8.625 8.625 0 0 1 1.33 9.94a8.62 8.62 0 0 1 8.61-8.61 8.617 8.617 0 0 1 8.609 8.609 8.622 8.622 0 0 1-8.61 8.609z"
              fill="#454F5B"
            />
          </svg>
        </InputContainer>
      </JobSearchContainer>
      <CityInput
        cities={cities}
        handleChange={selectedCity => setcity(selectedCity)}
      >
        A onde procuras?
      </CityInput>

      <Button onClick={handleClick}>Procurar</Button>
    </Container>
  );
};

export default Search;
