import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  color: #ec2f2f;
  font-weight: 600;
  display: flex;
  justify-content: ${props => (props.center ? 'center' : 'start')};
  margin-bottom: 2rem;
`;

export default ({ children, ...restProps }) => (
  <Container {...restProps}>
    <span>{children}</span>
  </Container>
);
