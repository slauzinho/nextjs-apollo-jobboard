import Editor from 'draft-js-plugins-editor';
import createToolbarPlugin from 'draft-js-static-toolbar-plugin';
// @ts-ignore
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
import { useRef } from 'react';
import { EditorState } from 'draft-js';
import { EditorContainer, Container } from './styles';

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
  editorState: EditorState;
  readOnly: boolean;
  onBlur: (event: React.FormEvent<HTMLInputElement>) => void;
  onChange: (editorState: EditorState) => void;
}

const C: React.FC<IProps> = ({ editorState, readOnly, onBlur, onChange }) => {
  const editor = useRef(null);
  return (
    <Container>
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
          editorState={editorState}
          plugins={plugins}
          readOnly={readOnly}
          ref={editor}
          onBlur={onBlur}
          onChange={onChange}
        />
      </EditorContainer>
    </Container>
  );
};

export default C;
