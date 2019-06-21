import React, { useState } from 'react';
import { NextFunctionComponent } from 'next';
import Job from '../Job';
import Details from '../Details';
import { JobMeQuery } from 'types';

interface IProps {
  jobs: JobMeQuery[];
}

const Jobs: NextFunctionComponent<IProps> = ({ jobs }) => {
  const [activeJob, setActiveJob] = useState<JobMeQuery>();

  if (!jobs) {
    return <div>Ups no jobs...</div>;
  }

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 'none' }}>
        {jobs.map(job => (
          <Job job={job} key={job.id} openEditor={setActiveJob} />
        ))}
        {jobs.map(job => (
          <Job job={job} key={job.id} openEditor={setActiveJob} />
        ))}
        {jobs.map(job => (
          <Job job={job} key={job.id} openEditor={setActiveJob} />
        ))}
        {jobs.map(job => (
          <Job job={job} key={job.id} openEditor={setActiveJob} />
        ))}
        {jobs.map(job => (
          <Job job={job} key={job.id} openEditor={setActiveJob} />
        ))}
      </div>
      <div>
        {' '}
        {activeJob && (
          <Details
            job={activeJob}
            closeEditor={() => setActiveJob(undefined)}
            key={activeJob.id}
          />
        )}
      </div>
    </div>
  );
};

export default Jobs;
