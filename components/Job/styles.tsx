import styled from 'styled-components';

interface IPillProps {
  readonly status: string;
}

export const Container = styled.div<IPillProps>`
  background-color: ${props => props.theme.colors.article};
  padding: 2rem 2rem;
  color: black;
  max-width: 30vw;
  border-left: 2px solid ${props => props.theme.status[props.status]};

  p {
    color: ${props =>
      props.status === 'EXPIRED' ? props.theme.status.EXPIRED : 'inheret'};
    margin-top: 1rem;
  }
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

export const Pill = styled.span<IPillProps>`
  font-size: 1rem;
  text-transform: uppercase;
  padding: 0.5rem 0.8rem;
  border-radius: 5px;
  background-color: ${props => props.theme.status[props.status]};
`;
