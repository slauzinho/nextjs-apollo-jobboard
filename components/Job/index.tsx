import React from 'react';
import { NextFunctionComponent } from 'next';
import { Container, CardTop, Title, Pill, CityWrapper } from './styles';
import { JobMeQuery } from 'types';

interface IProps {
  job: JobMeQuery;
}

const transformStatus = (status: string): string => {
  switch (status) {
    case 'APPROVED':
      return 'Online';
    case 'EXPIRED':
      return 'Expirado';
    case 'PENDING':
      return 'Pendente';
    default:
      return 'Rejeitado';
  }
};

const Job: NextFunctionComponent<IProps> = ({ job }) => (
  <Container status={job.status}>
    <CardTop>
      <span>{job.company}</span>
      <span>{job.published_at}</span>
    </CardTop>
    <Title>{job.title}</Title>
    <CityWrapper>
      <span>{job.city.name}</span>
      <Pill status={job.status}>{transformStatus(job.status)}</Pill>
    </CityWrapper>
    <p>{job.shortDescription}</p>
  </Container>
);

export default Job;
