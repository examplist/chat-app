import styled from 'styled-components';
import * as color from 'styles/color';

export const Section = styled.section`
  display: flex;
  justify-content: center;
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 8rem;
  height: 2rem;
  border: none;
  border-radius: 0;
  cursor: pointer;
  color: white;
  background-color: ${color.alizarin};

  &:hover {
    background-color: ${color.pomegranate};
  }
`;
