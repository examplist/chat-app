import styled from 'styled-components';
import { OnlyMessage } from 'styles/layout';

export const NoMessage = styled(OnlyMessage)`
  min-height: 0;
  flex-grow: 1;
`;

export const Container = styled.section`
  height: 0;
  overflow-y: auto;
  flex-grow: 1;
  margin-bottom: 1rem;
`;

export const OutMessage = styled.div`
  background-color: red;
  color: white;
  padding: 0.5rem 0;
  text-align: center;
`;

const MessageContainer = styled.article`
  height: 5rem;
  display: flex;
  align-items: center;
`;

export const MyMessageContainer = styled(MessageContainer)`
  justify-content: flex-end;
`;

export const MyMessageContent = styled.div`
  position: relative;
  margin-right: 1.5rem;

  div:nth-child(1) {
    height: 80%;
    border: 1px solid black;
    padding: 0.75rem 1rem;
    cursor: pointer;
  }

  div:nth-child(2) {
    border-top: 1px solid black;
    border-right: 1px solid black;
    background-color: white;
    z-index: 1;
    width: 1rem;
    height: 1rem;
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(50%, -50%) rotate(45deg);
  }
`;

export const MyMessageDelete = styled.button`
  width: 3rem;
  height: 30%;
  background-color: red;
  color: white;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-right: 0.75rem;
`;

export const AnotherMessageContainer = styled(MessageContainer)``;

export const AnotherMessagePhoto = styled.div`
  width: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;

  img {
    width: 70%;
    aspect-ratio: 1;
  }
`;

export const AnotherMessageContent = styled.div`
  position: relative;

  div:nth-child(1) {
    height: 80%;
    border: 1px solid black;
    padding: 0.75rem 1rem;
  }

  div:nth-child(2) {
    border-left: 1px solid black;
    border-bottom: 1px solid black;
    background-color: white;
    z-index: 1;
    width: 1rem;
    height: 1rem;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(-50%, -50%) rotate(45deg);
  }
`;
