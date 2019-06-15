import styled from 'styled-components';

export const Container = styled.div`
  width: 30vw;
  transition: opacity 150ms ease-in-out;
  position: sticky;
  margin-left: 5rem;
  border-top: 0.5rem solid red;
  color: black;
  overflow: hidden;
  padding: 0 1rem;
`;

export const EditorContainer = styled.div`
  height: 50rem;
  overflow: overlay;
`;

export const TopContainer = styled.div`
  display: flex;
  overflow: hidden;
  justify-content: space-between;
  align-items: center;
  z-index: 5;
  position: relative;
  background-color: white;
  padding: 1.2rem 0;
`;

export const CloseBtn = styled.button`
  font-size: 1.6rem;
`;
