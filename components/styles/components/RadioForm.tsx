import React from 'react';
import styled from 'styled-components';

/** Checkbox styles */
const Container = styled.div`
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

const InputFeedback = ({ error }) =>
  error ? <div className="input-feedback">{error}</div> : null;

export const Checkbox = ({
  field: { name, value, onChange, onBlur },
  form: { errors, touched, setFieldValue },
  id,
  label,
  ...props
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

// Checkbox group
export class CheckboxGroup extends React.Component {
  handleChange = event => {
    const target = event.currentTarget;
    const valueArray = this.props.value || [];

    if (target.checked) {
      valueArray.push(target.id);
    } else {
      valueArray.splice(valueArray.indexOf(target.id), 1);
    }

    this.props.onChange(this.props.id, valueArray);
  }

  handleBlur = () => {
    // take care of touched
    this.props.onBlur(this.props.id, true);
  }

  render() {
    const { value, error, touched, label, children } = this.props;

    return (
      <div>
        <h3>{label}</h3>
        <InnerContainer>
          {React.Children.map(children, child => {
            return React.cloneElement(child, {
              field: {
                value: value.includes(child.props.id),
                onChange: this.handleChange,
                onBlur: this.handleBlur,
              },
            });
          })}
        </InnerContainer>
        {touched && <InputFeedback error={error} />}
      </div>
    );
  }
}
