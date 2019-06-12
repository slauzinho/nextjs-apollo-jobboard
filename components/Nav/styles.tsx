import styled from 'styled-components';

export const Container = styled.nav`
  max-width: 1200px;
  background-color: #fff;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;

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
