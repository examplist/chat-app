import styled from 'styled-components';
import { height_header, screen_tiny } from 'styles/layout';

export const Container = styled.header`
  display: flex;
  height: ${height_header};
  background-color: #eee;
  border-bottom: 3px solid black;
`;

export const Title = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;

  a {
    color: black;
    text-decoration: none;
  }

  @media (max-width: ${screen_tiny}) {
    font-size: 1.5rem;
  }
`;

export const Sign = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
  width: calc(${height_header} * 0.8);
`;
