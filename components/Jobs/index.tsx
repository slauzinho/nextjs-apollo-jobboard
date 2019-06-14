import React from 'react';
import { NextFunctionComponent } from 'next';
import Job from '../Job';
import { JobMeQuery } from 'types';

interface IProps {
  jobs: JobMeQuery[];
}

const Jobs: NextFunctionComponent<IProps> = ({ jobs }) => {
  if (!jobs) {
    return <div>Ups no jobs...</div>;
  }
  return (
    <div>
      {jobs.map(job => (
        <Job job={job} key={job.id} />
      ))}
      <div>Hello</div>
    </div>
  );
};

export default Jobs;
