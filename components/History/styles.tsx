import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
`;

export const Title = styled.h3`
  color: ${props => props.theme.text.dark};
  font-size: 1.6rem;
  font-weight: 700;
  flex: 1;
`;

export const Delete = styled.a`
  font-size: 1.4rem;
  color: ${props => props.theme.text.primary};

  :hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;
