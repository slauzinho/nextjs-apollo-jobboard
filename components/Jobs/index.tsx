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
  const [editorState, setEditorState] = useState<EditorState>();
  const [activeJob, setActiveJob] = useState<JobMeQuery>();
  const handleClick = (job: JobMeQuery) => {
    setActiveJob(job);
    setEditorState(ConvertJobStateFromHtml(job.description));
  };
  const resetEditor = () => {
    setEditorState(undefined);
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
      </div>
      <div>
        {' '}
        {editorState && activeJob && (
          <Editor
            editorState={editorState}
            readOnly={true}
            job={activeJob}
            closeEditor={resetEditor}
          />
        )}
      </div>
    </div>
  );
};

export default Jobs;
