import React, { useState, useRef } from 'react';
import { EditorState } from 'draft-js';
import { NextFunctionComponent } from 'next';
import {
  Container,
  EditorContainer,
  TopContainer,
  CloseBtn,
  CardTop,
  Title,
  CityWrapper,
  CategoriesWrapper,
  Tag,
  FooterContainer,
} from './styles';
import {
  useDeleteJobMutation,
  MeDocument,
  MeQuery,
} from '../generated/apolloComponents';
import { JobMeQuery } from '../../types';
import { stateFromHTML } from 'draft-js-import-html';
import Editor from 'draft-js-plugins-editor';
import createToolbarPlugin from 'draft-js-static-toolbar-plugin';

import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton,
} from 'draft-js-buttons';

// @ts-ignore
const staticToolbarPlugin = createToolbarPlugin([
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton,
]);

const { Toolbar } = staticToolbarPlugin;
const plugins = [staticToolbarPlugin];

interface IProps {
  job: JobMeQuery;
  closeEditor: () => void;
}

const ConvertJobStateFromHtml = (htmlString: string) => {
  return EditorState.createWithContent(stateFromHTML(htmlString));
};

const Component: NextFunctionComponent<IProps> = ({ job, closeEditor }) => {
  const [readOnly, setReadOnly] = useState(true);
  const [editorState, setEditorState] = useState<EditorState>(
    ConvertJobStateFromHtml(job.description)
  );
  const editor = useRef(null);
  const deleteJob = useDeleteJobMutation({
    update: cache => {
      const data = cache.readQuery<MeQuery>({ query: MeDocument });
      if (data) {
        const newJobs = data.me!.jobs.filter(newjob => newjob.id !== job.id);
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
    variables: { id: job.id },
  });

  return (
    <Container>
      <TopContainer>
        <div style={{ width: '100%' }}>
          <CardTop>
            <span>{job.company}</span>
            <span>{job.published_at}</span>
          </CardTop>
          <Title>{job.title}</Title>
          <CityWrapper>
            <span>{job.city.name}</span>
            <CategoriesWrapper>
              {job.categories.map(t => (
                <span key={t.id}>{t.name}</span>
              ))}
            </CategoriesWrapper>
          </CityWrapper>
        </div>
        <CloseBtn onClick={() => closeEditor()}>&times;</CloseBtn>
      </TopContainer>
      {!readOnly && (
        <Toolbar>
          {(externalProps: any) => (
            <>
              <HeadlineThreeButton
                {...externalProps}
                theme={{
                  active: 'draftJsToolbar__active__3qcpF',
                  button: 'draftJsToolbar__button__qi1gf my-title-button',
                  buttonWrapper: 'draftJsToolbar__buttonWrapper__1Dmqh',
                }}
              />
              <BoldButton {...externalProps} />
              <ItalicButton {...externalProps} />
              <UnderlineButton {...externalProps} />
              <UnorderedListButton {...externalProps} />
              <OrderedListButton {...externalProps} />
            </>
          )}
        </Toolbar>
      )}
      <EditorContainer>
        <Editor
          plugins={plugins}
          editorState={editorState}
          ref={editor}
          readOnly={readOnly}
          onChange={newEditorState => setEditorState(newEditorState)}
        />
      </EditorContainer>
      <FooterContainer>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex' }}>
            {job.tags.map(t => (
              <Tag key={t.id}>{t.name}</Tag>
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            deleteJob();
          }}
        >
          Delete
        </button>
        <button
          type="button"
          onClick={() => {
            setReadOnly(!readOnly);
          }}
        >
          Editar
        </button>
      </FooterContainer>
    </Container>
  );
};

export default Component;
