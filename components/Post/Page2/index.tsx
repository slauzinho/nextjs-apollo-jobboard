import React from 'react';
import { Field, FormikProps } from 'formik';
import styled from 'styled-components';
import { CheckboxGroup, Checkbox } from '../../styles/components/RadioForm';
import Input from '../../styles/components/Input';
import { Category } from '../../generated/apolloComponents';
import { FormData } from '../../../pages/post';

const InnerContainer = styled.div`
  div {
    display: inline-flex;
    align-items: center;
    color: #5a38d6;
    text-decoration: underline;
    font-weight: bold;
    margin-top: 1rem;
    cursor: pointer;
    svg {
      margin-right: 0.5rem;
    }
  }
`;

interface IProps {
  categories: Category[];
}

const Page: React.FC<IProps & FormikProps<FormData>> = ({
  values,
  errors,
  touched,
  setFieldValue,
  setFieldTouched,
  handleBlur,
  handleChange,
  categories,
}) => {
  return (
    <>
      <CheckboxGroup
        id="categories"
        label="Qual é o tipo da oferta?"
        value={values.categories}
        error={errors.categories}
        touched={touched.categories}
        onChange={setFieldValue}
        onBlur={setFieldTouched}
      >
        {categories.map(category => (
          <Field
            component={Checkbox}
            name="categories"
            id={String(category.id)}
            label={category.name}
            key={category.id}
          />
        ))}
      </CheckboxGroup>
      <InnerContainer>
        <h4>Email para os candidatos enviarem a sua candidatura:</h4>
        <Field
          component={Input}
          name="emailCandidatura"
          id="emailCandidatura"
          label="emailCandidatura"
          type="email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.emailCandidatura}
        />
        <div>
          <svg
            width="15"
            height="15"
            viewBox="0 0 28 28"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Page-1" fill="none" fillRule="evenodd">
              <g id="noun_add_681016" fill="#5a38d6" fillRule="nonzero">
                <path
                  d="M14,0.2 C6.41,0.2 0.2,6.41 0.2,14 C0.2,21.59 6.41,27.8 14,27.8 C21.59,27.8 27.8,21.59 27.8,14 C27.8,6.41 21.59,0.2 14,0.2 Z M14,25.178 C7.859,25.178 2.822,20.21 2.822,14 C2.822,7.859 7.79,2.822 14,2.822 C20.21,2.822 25.178,7.859 25.178,14 C25.178,20.141 20.141,25.178 14,25.178 Z M18.83,12.62 L15.38,12.62 L15.38,9.17 C15.38,8.411 14.759,7.79 14,7.79 C13.241,7.79 12.62,8.411 12.62,9.17 L12.62,12.62 L9.17,12.62 C8.411,12.62 7.79,13.241 7.79,14 C7.79,14.759 8.411,15.38 9.17,15.38 L12.62,15.38 L12.62,18.83 C12.62,19.589 13.241,20.21 14,20.21 C14.759,20.21 15.38,19.589 15.38,18.83 L15.38,15.38 L18.83,15.38 C19.589,15.38 20.21,14.759 20.21,14 C20.21,13.241 19.589,12.62 18.83,12.62 Z"
                  id="Shape"
                />
              </g>
            </g>
          </svg>
          Adiocionar outro e-mail
        </div>
        <h4>Pode adicionar o link para a página do anuncio:</h4>
        <Field
          component={Input}
          name="url"
          id="url"
          Label="url"
          type="text"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.url}
        />
      </InnerContainer>
    </>
  );
};

export default Page;
