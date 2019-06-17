import React from 'react';
import styled from 'styled-components';
import { FieldProps, FormikErrors } from 'formik';

interface IContainerProps {
  active: string;
}

/** Checkbox styles */
const Container = styled.div<IContainerProps>`
  height: 4rem;
  line-height: 4rem;
  background-color: ${props => (props.active ? '#008040' : 'white')};
  color: ${props => (props.active ? 'white' : 'black')};
  font-weight: ${props => (props.active ? 'bold' : 400)};
  border-radius: 3px;
  border: 1px solid #ccc;
  border-color: ${props => (props.active ? '#008040' : '#ccc')};
  display: inline-block;
  text-align: center;
  cursor: pointer;
  padding: 0 15px;
  min-width: 75px;
  margin-right: 5px;
  margin-bottom: 5px;
  padding: 0 1rem;
  min-width: 190px;
  flex-grow: 1;
  font-size: 1.6rem;

  label {
    display: flex;
    justify-content: center;
    min-width: 190px;
    user-select: none;
    cursor: pointer;
  }
`;

/** CheckboxGroup styles */
const InnerContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const InputFeedback = ({
  error,
}: {
  error: string | FormikErrors<any> | undefined | Array<string | undefined>;
}) => (error ? <div className="input-feedback">{error}</div> : null);

interface ICheckboxProps {
  id: string;
  label: string;
}

export const Checkbox: React.FC<ICheckboxProps & FieldProps> = ({
  field: { name, value, onChange, onBlur },
  form: { errors, touched },
  id,
  label,
}) => {
  return (
    <Container active={value}>
      <input
        name={name}
        id={id}
        type="checkbox"
        value={value}
        checked={value}
        onChange={onChange}
        onBlur={onBlur}
        className={'radio-button'}
        style={{ display: 'none' }}
      />
      <label htmlFor={id}>{label}</label>
      {touched[name] && <InputFeedback error={errors[name]} />}
    </Container>
  );
};

interface ICheckboxGroupProps {
  id: string;
  label: string;
  value: string[] | [];
  error: Array<string | undefined> | undefined;
  touched: Array<boolean | undefined> | undefined;
  onChange: any;
  onBlur: any;
}

// Checkbox group
export const CheckboxGroup: React.FC<ICheckboxGroupProps> = props => {
  const {
    value,
    error,
    touched,
    label,
    children,
    onChange,
    onBlur,
    id,
  } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.currentTarget;
    const valueArray = value as any | [];

    if (target.checked) {
      valueArray.push(target.id);
    } else {
      valueArray.splice(valueArray.indexOf(target.id), 1);
    }

    onChange(id, valueArray);
  };

  const handleBlur = () => {
    onBlur(id, true);
  };

  return (
    <div>
      <h3>{label}</h3>
      <InnerContainer>
        {React.Children.map(
          children as React.ReactElement<any>,
          (checkbox: React.ReactElement<any>) => {
            return React.cloneElement(checkbox, {
              field: {
                // @ts-ignore
                value: value.includes(checkbox.props.id),
                onChange: handleChange,
                onBlur: handleBlur,
              },
            });
          }
        )}
      </InnerContainer>
      {touched && <InputFeedback error={error} />}
    </div>
  );
};
