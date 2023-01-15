import styled from 'styled-components';
import * as color from 'styles/color';

export const AddButton = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background-color: ${color.concrete};
  border: none;
  width: 2rem;
  height: 2rem;
  font-size: 1.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 1;
`;

export const AddPopUp = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  justify-content: center;
  align-items: center;
  display: none;
  &.visible {
    display: flex;
  }
`;

export const AddPopUpContent = styled.div`
  width: 60%;
  padding: 1rem;
  background-color: white;
`;

export const AddPopUpContentTitle = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 1rem;
`;

export const AddPopUpContentInput = styled.div`
  height: 2rem;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  label {
    font-size: 1.1rem;
    margin-right: 0.5rem;
  }

  input {
    flex-grow: 1;
    height: 70%;
    border-radius: 0;
    border: 1px solid black;
  }
`;

export const AddPopUpContentSubmit = styled.button`
  background-color: ${color.wisteria};
  width: 4rem;
  height: 2rem;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: white;
`;
