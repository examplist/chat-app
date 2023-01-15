import styled from 'styled-components';
import * as color from 'styles/color';

export const NotLoggedIn = styled.section`
  width: 25rem;
`;

export const Label = styled.label`
  display: block;
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

export const Input = styled.input`
  display: block;
  width: 100%;
  height: 2.5rem;
  margin-bottom: 1rem;
  border-radius: 0;
  border: 1px solid black;
  padding: 0 0.5rem;
`;

export const Buttons = styled.div`
  margin: 2rem 0;
  display: flex;
  justify-content: center;
  height: 2rem;

  button {
    cursor: pointer;
    flex-grow: 1;
    border: none;
    height: 2rem;
  }
`;

export const Login = styled.button`
  background-color: ${color.sunflower};

  &:hover {
    background-color: ${color.orange};
  }
`;

export const Signup = styled.button`
  background-color: ${color.carrot};

  &:hover {
    background-color: ${color.pumpkin};
  }
`;
