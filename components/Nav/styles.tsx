import styled from 'styled-components';

export const Container = styled.nav`
  background-color: #fff;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  border-bottom: 1px solid #e6e9f5;

  a {
    display: inline-block;
    margin-left: 1rem;
    text-decoration: none;
    color: #1a202c;
  }

  a:hover {
    text-decoration: underline;
  }

  div:first-child {
    flex: 1;
    margin-left: -1rem;
  }
`;
