import React from 'react';
import { Field, FormikProps } from 'formik';
import styled from 'styled-components';

// import TestSearch from '../TestSearch';
import MyInput from '../../styles/components/Input';
import Error from '../../styles/components/Error';
import CityInput from '../../CityInput';
import { City } from '../../generated/apolloComponents';
import { FormData } from '../../../pages/post';

const Wrapper = styled.div`
  display: flex;
  margin-top: 3rem;
`;

interface IProps {
  cities: City[];
}

const Page: React.FC<IProps & FormikProps<FormData>> = ({
  handleChange,
  handleBlur,
  values,
  errors,
  touched,
  setFieldValue,
  setFieldTouched,
  cities,
}) => (
  <>
    <h3>Titulo do Anuncio</h3>
    <Field
      type="text"
      name="title"
      id="title"
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.title}
      component={MyInput}
    />
    {errors.title && touched.title && <Error>{errors.title}</Error>}
    <Wrapper>
      <div style={{ flex: 1, marginRight: '3rem' }}>
        <h3>Empresa</h3>
        <Field
          type="text"
          name="empresa"
          id="empresa"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.empresa}
          component={MyInput}
        />
        {errors.empresa && touched.empresa && <Error>{errors.empresa}</Error>}
      </div>
    </Wrapper>
    <Field
      type="text"
      name="city"
      id="city"
      onChange={handleChange}
      onBlur={handleBlur}
      setFieldTouched={setFieldTouched}
      component={CityInput}
      handleChange={(item: City) => setFieldValue('city', item.name)}
      cities={cities}
    >
      Cidade
    </Field>
  </>
);

export default Page;
