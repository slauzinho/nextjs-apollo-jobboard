import React, { useState } from 'react';
import { NextFunctionComponent } from 'next';
import { stateFromHTML } from 'draft-js-import-html';
import { EditorState } from 'draft-js';
import Job from '../Job';
import Editor from '../Editor';
import { JobMeQuery } from 'types';

interface IProps {
  jobs: JobMeQuery[];
}

const ConvertJobStateFromHtml = (htmlString: string) => {
  return EditorState.createWithContent(stateFromHTML(htmlString));
};

const Jobs: NextFunctionComponent<IProps> = ({ jobs }) => {
  const [editorState, setEditorState] = useState<any>();
  const [activeJob, setActiveJob] = useState();
  const handleClick = (job: JobMeQuery) => {
    setActiveJob(job);
    setEditorState(ConvertJobStateFromHtml(job.description));
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
      </div>
      <div>
        {' '}
        {editorState && (
          <Editor editorState={editorState} readOnly={true} job={activeJob} />
        )}
      </div>
    </div>
  );
};

export default Jobs;
