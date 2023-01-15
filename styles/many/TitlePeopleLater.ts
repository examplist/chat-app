import styled from 'styled-components';

export const Container = styled.div`
  flex-grow: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.div`
  margin-bottom: 1rem;
  font-size: 1.25rem;
`;

export const List = styled.div`
  height: 0;
  flex-grow: 1;
  overflow-y: auto;
`;
