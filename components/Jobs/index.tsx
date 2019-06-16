import React, { useState } from 'react';
import { NextFunctionComponent } from 'next';
import Job from '../Job';
import Editor from '../Editor';
import { JobMeQuery } from 'types';

interface IProps {
  jobs: JobMeQuery[];
}

const Jobs: NextFunctionComponent<IProps> = ({ jobs }) => {
  const [activeJob, setActiveJob] = useState<JobMeQuery>();
  const handleClick = (job: JobMeQuery) => {
    setActiveJob(job);
  };
  // Reset to initial state
  const resetEditor = () => {
    setActiveJob(undefined);
  };

  if (!jobs) {
    return <div>Ups no jobs...</div>;
  }
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 'none' }}>
        {jobs.map(job => (
          <Job job={job} key={job.id} openEditor={handleClick} />
        ))}
        {jobs.map(job => (
          <Job job={job} key={job.id} openEditor={handleClick} />
        ))}
        {jobs.map(job => (
          <Job job={job} key={job.id} openEditor={handleClick} />
        ))}
        {jobs.map(job => (
          <Job job={job} key={job.id} openEditor={handleClick} />
        ))}
        {jobs.map(job => (
          <Job job={job} key={job.id} openEditor={handleClick} />
        ))}
      </div>
      <div>
        {' '}
        {activeJob && (
          <Editor
            job={activeJob}
            closeEditor={resetEditor}
            key={activeJob.id}
          />
        )}
      </div>
    </div>
  );
};

export default Jobs;
