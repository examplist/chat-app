import styled from 'styled-components';
import * as color from 'styles/color';

export const Button = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;

  button {
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.25rem;
    background-color: ${color.asbestos};
    color: white;
    cursor: pointer;
  }
`;

export const Users = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 20;
  background-color: rgba(0, 0, 0, 0.4);
  justify-content: center;
  align-items: center;

  display: none;
  &.visible {
    display: flex;
  }
`;

export const UsersContainer = styled.div`
  width: 60%;
  height: 60%;
  background-color: white;
  display: flex;
  flex-direction: column;
`;
