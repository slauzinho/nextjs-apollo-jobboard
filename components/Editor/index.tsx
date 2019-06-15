import React from 'react';
import { Editor, EditorState } from 'draft-js';
import { NextFunctionComponent } from 'next';
import { Container, EditorContainer, TopContainer, CloseBtn } from './styles';
import {
  useDeleteJobMutation,
  MeDocument,
  MeQuery,
} from '../generated/apolloComponents';
import { JobMeQuery } from '../../types';

interface IProps {
  editorState: EditorState;
  readOnly: boolean;
  job: JobMeQuery;
  closeEditor: any;
}

const Component: NextFunctionComponent<IProps> = props => {
  const deleteJob = useDeleteJobMutation({
    update: cache => {
      const data = cache.readQuery<MeQuery>({ query: MeDocument });
      if (data) {
        const newJobs = data.me!.jobs.filter(job => job.id !== props.job.id);
        cache.writeQuery({
          query: MeDocument,
          data: {
            me: {
              ...data.me,
              jobs: newJobs,
            },
          },
        });
      }
    },
    variables: { id: props.job.id },
  });

  return (
    <Container>
      <TopContainer>
        <button
          onClick={() => {
            deleteJob();
          }}
        >
          Delete
        </button>
        <CloseBtn onClick={() => props.closeEditor()}>&times;</CloseBtn>
      </TopContainer>
      <EditorContainer>
        <Editor
          editorState={props.editorState}
          readOnly={props.readOnly}
          onChange={() => ''}
        />
      </EditorContainer>
    </Container>
  );
};

export default Component;
