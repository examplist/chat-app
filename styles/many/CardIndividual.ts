import styled from 'styled-components';
import * as color from 'styles/color';

export const Card = styled.article`
  display: flex;
  height: 4rem;
`;

export const Img = styled.div`
  width: 4rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  img {
    width: 75%;
    aspect-ratio: 1;
  }
`;

export const Name = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  font-size: 1rem;
`;

export const Button = styled.div`
  display: flex;
  align-items: center;

  button {
    background-color: ${color.greensea};
    width: 3rem;
    height: 2rem;
    cursor: pointer;
    border: none;
  }
`;
