import React from 'react';
import { EditorState } from 'draft-js';
import {
  Container,
  TopContainer,
  CloseBtn,
  CardTop,
  Title,
  CityWrapper,
  CategoriesWrapper,
  Tag,
  FooterContainer,
} from '../Details/styles';
import { useJobQueryQuery } from '../generated/apolloComponents';
import { stateFromHTML } from 'draft-js-import-html';
import Editor from '../Editor';

interface IProps {
  id: string;
  closeEditor: () => void;
}

const ConvertJobStateFromHtml = (htmlString: string) => {
  return EditorState.createWithContent(stateFromHTML(htmlString));
};

const Component: React.FC<IProps> = ({ id, closeEditor }) => {
  const { data, loading } = useJobQueryQuery({
    variables: { id },
  });
  if (loading) {
    return <div>Loading</div>;
  }

  if (data && data.job) {
    const { job } = data;
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
        <Editor
          editorState={ConvertJobStateFromHtml(job.description)}
          readOnly={true}
          onChange={() => {}}
          onBlur={e => {}}
        />
        <FooterContainer>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex' }}>
              {job.tags.map(tag => (
                <Tag key={tag!.id}>{tag!.name}</Tag>
              ))}
            </div>
          </div>
        </FooterContainer>
      </Container>
    );
  }
  return <div>Error</div>;
};

export default Component;
