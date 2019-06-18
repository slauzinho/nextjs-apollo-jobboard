import React from 'react';
import { FormikProps, Field } from 'formik';
import { FormData } from '../../../pages/post';
import { Tag } from '../../generated/apolloComponents';
import { EditorState } from 'draft-js';
import Editor from '../../Editor';
import Tags from '../../Tags';

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
  return (
    <div>
      <Editor
        editorState={values.editorState}
        readOnly={false}
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
