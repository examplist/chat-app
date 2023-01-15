import styled from 'styled-components';

export const Card = styled.article`
  display: flex;
  cursor: pointer;
  height: 5rem;
`;

export const Img = styled.div`
  width: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 60%;
    aspect-ratio: 1;
  }
`;

export const Name = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  font-size: 1.25rem;
`;
