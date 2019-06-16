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

const useEditor = (job: any) => {
  const [readOnly, setReadOnly] = useState(true);
  const [editorState, setEditorState] = useState<EditorState>(
    ConvertJobStateFromHtml(job.description)
  );
};

const Jobs: NextFunctionComponent<IProps> = ({ jobs }) => {
  const [editorState, setEditorState] = useState<EditorState>();
  const [activeJob, setActiveJob] = useState<JobMeQuery>();
  const [readOnly, setReadOnly] = useState(true);
  const handleClick = (job: JobMeQuery) => {
    setActiveJob(job);
    setEditorState(ConvertJobStateFromHtml(job.description));
  };
  // Reset to initial state
  const resetEditor = () => {
    setEditorState(undefined);
    setActiveJob(undefined);
    setReadOnly(true);
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
            readOnly={readOnly}
            job={activeJob}
            closeEditor={resetEditor}
            makeEditable={() => setReadOnly(!readOnly)}
            setEditorState={setEditorState}
          />
        )}
      </div>
    </div>
  );
};

export default Jobs;
