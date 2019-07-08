import styled from 'styled-components';

export const JobSearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 2rem;
`;

export const InputContainer = styled.div`
  position: relative;
  svg {
    position: absolute;
    right: 12px;
    top: 20%;
  }
`;

export const Container = styled.div`
  display: flex;
  margin-top: 10rem;
  margin-bottom: 5rem;
  #jobLabels,
  #cityLabels {
    display: flex;
    flex-direction: column;

    label:first-child {
      font-weight: 700;
      font-size: ${props => props.theme.text.size.big};
    }

    label:nth-child(2) {
      color: ${props => props.theme.text.light};
      font-size: ${props => props.theme.text.size.small};
    }
  }

  button {
    align-self: flex-end;
    margin-left: 2rem;
  }
`;
