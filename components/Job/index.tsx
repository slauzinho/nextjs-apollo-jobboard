import React from 'react';
import { Container, CardTop, Title, Pill, CityWrapper } from './styles';
import { JobMeQuery, IDoc } from '../../types';
import { distanceInWordsToNow } from '../../components/utils';

interface IProps {
  job: JobMeQuery | IDoc;
  openEditor: any;
}

/**
 * Check if the object is instance of JobMyQuery
 */
function instanceOfJob(object: any): object is JobMeQuery {
  return 'status' in object;
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

const Job: React.FC<IProps> = ({ job, openEditor }) => (
  <Container
    status={job.status}
    onClick={() => {
      openEditor(job);
    }}
  >
    <CardTop>
      <span>{job.company}</span>
      {!instanceOfJob(job) && (
        <span>{distanceInWordsToNow(job.updated_at)} atrás</span>
      )}
      {instanceOfJob(job) && job.published_at && (
        <span>{distanceInWordsToNow(job.published_at)} atrás</span>
      )}
    </CardTop>
    <Title>{job.title}</Title>
    <CityWrapper>
      {instanceOfJob(job) ? (
        <>
          <span>{job.city.name}</span>
          <Pill status={job.status}>{transformStatus(job.status)}</Pill>
        </>
      ) : (
        <span>{job.city}</span>
      )}
    </CityWrapper>
    <p>{job.shortDescription}</p>
    {!instanceOfJob(job) && (
      <div style={{ display: 'flex' }}>
        {job.categories.map(c => (
          <div key={c}>{c}</div>
        ))}
      </div>
    )}
  </Container>
);

export default Job;
