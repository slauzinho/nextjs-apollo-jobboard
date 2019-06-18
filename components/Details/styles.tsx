import styled from 'styled-components';

export const Container = styled.div`
  width: 790px;
  transition: opacity 150ms ease-in-out;
  margin-left: 5rem;
  border-top: 0.5rem solid red;
  color: black;
  overflow: hidden;
  padding: 0 1rem;
  position: sticky;
  top: 0;
  margin-top: 2rem;
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

export const CityWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

export const CardTop = styled.div`
  display: flex;
  justify-content: space-between;
  color: #c1c1c4;
  font-size: ${props => props.theme.text.size.small};
`;

export const Title = styled.h5`
  font-size: ${props => props.theme.text.size.big};
  color: ${props => props.theme.text.dark};
  font-weight: 600;
`;

export const CategoriesWrapper = styled.div`
  display: flex;
  font-size: ${props => props.theme.text.size.smaller};
  flex-wrap: wrap;
  span {
    margin-right: 0.5rem;
  }
`;

export const FooterContainer = styled.div`
  display: flex;
  margin-top: 1rem;
  z-index: 44;
  position: relative;
  background: white;
  button:first-of-type {
    margin-right: 1rem;
  }
`;

export const Tag = styled.div`
  padding: 5px 5px;
  font-size: ${props => props.theme.text.size.smaller};
  color: ${props => props.theme.colors.primary};
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
