import styled from 'styled-components';

export const Container = styled.div`
  display: relative;
  width: 30vw;
  transition: opacity 150ms ease-in-out;
  position: sticky;
  margin-left: 5rem;
  border-top: 0.5rem solid red;
  color: black;
  overflow: hidden;
`;

export const EditorContainer = styled.div`
  height: 50rem;
  overflow: overlay;
`;
