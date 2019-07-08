import styled from 'styled-components';

const Button = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  padding: 0.9rem 3rem;
  border-radius: 7rem;
  font-weight: 700;
  border: 2px solid ${props => props.theme.colors.primary};
  cursor: pointer;

  :hover {
    background-color: ${props => props.theme.colors.primaryDarker};
    border: 2px solid ${props => props.theme.colors.primaryDarker};
  }
`;

export default Button;
