import React, { useRef } from 'react';
import { FormikProps, Field } from 'formik';
import { FormData } from '../../../pages/post';
import { Tag } from '../../generated/apolloComponents';
import { EditorState } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createToolbarPlugin from 'draft-js-static-toolbar-plugin';
import Tags from '../../Tags';
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
  tags: Tag[];
}

const Page: React.FC<FormikProps<FormData> & IProps> = ({
  handleBlur,
  values,
  status,
  setStatus,
  setFieldValue,
  tags,
}) => {
  const editor = useRef(null);
  return (
    <div>
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
      <Editor
        editorState={values.editorState}
        plugins={plugins}
        ref={editor}
        onBlur={e => {
          (e.target as HTMLInputElement).id = 'editorState';
          if (!values.editorState.getCurrentContent().hasText()) {
            setStatus({ editorState: 'Oferta deve ter uma descrição' });
          } else {
            setStatus({ editorState: '' });
          }
          handleBlur(e);
        }}
        onChange={(editorState: EditorState) => {
          // TODO REMOVE?!
          /** I dont know if we should validate on change */
          if (
            values.editorState.getCurrentContent().hasText() &&
            status &&
            status.editorState
          ) {
            setStatus({ editorState: '' });
          }
          setFieldValue('editorState', editorState);
        }}
      />
      <div>
        <Field
          component={Tags}
          name="tags"
          id="tags"
          setFieldValue={setFieldValue}
          onBlur={handleBlur}
          initialState={values.tags}
          tags={tags}
        />
      </div>
    </div>
  );
};

export default Page;
