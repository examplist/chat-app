import styled from 'styled-components';
import * as color from 'styles/color';

export const Form = styled.form`
  display: flex;
  height: 2rem;
  margin-bottom: 1rem;
`;

export const Input = styled.input`
  flex-grow: 1;
  margin: 0 1rem;
`;

export const Button = styled.button`
  width: 3rem;
  border: none;
  background-color: ${color.emerald};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
  cursor: pointer;
`;
