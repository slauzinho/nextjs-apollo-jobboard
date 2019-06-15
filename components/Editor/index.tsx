import React from 'react';
import { Editor, EditorState } from 'draft-js';
import { NextFunctionComponent } from 'next';
import { Container, EditorContainer } from './styles';

import { JobMeQuery } from '../../types';

interface IProps {
  editorState: EditorState;
  readOnly: boolean;
  job: JobMeQuery;
}

const Component: NextFunctionComponent<IProps> = props => {
  return (
    <Container>
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
