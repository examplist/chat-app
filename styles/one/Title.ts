import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  height: 5rem;
`;

export const BackButton = styled.div`
  width: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    width: 80%;
    aspect-ratio: 1;
    cursor: pointer;
    background-color: white;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.25rem;
  }
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.25rem;
`;

export const Space = styled.div`
  flex-grow: 1;
`;

export const Out = styled.button`
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  cursor: pointer;
  background-color: white;
  border: none;
  margin-right: 1rem;
`;
