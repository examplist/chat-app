import styled from 'styled-components';
import {
  height_header,
  height_category_when_narrow,
  screen_small,
  screen_tiny,
} from 'styles/layout';

export const ExistMain = styled.main`
  height: calc(100vh - ${height_header});
  display: flex;

  @media (max-width: ${screen_small}) {
    flex-direction: column;
  }
`;

export const Choose = styled.section`
  padding-top: 1rem;
  width: 9rem;
  flex-shrink: 0;
  border-right: 3px solid black;

  button {
    width: 100%;
    display: flex;
    border: none;
    justify-content: center;
    align-items: center;
    height: 2rem;
    font-size: 1.25rem;
    margin-bottom: 1rem;
    background-color: transparent;
    cursor: pointer;

    &.chosen {
      color: red;
    }
  }

  @media (max-width: ${screen_small}) {
    padding: 0;
    width: 100%;
    height: ${height_category_when_narrow};
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-bottom: 3px solid black;

    button {
      width: 6rem;
      margin: 0 1rem;
    }
  }

  @media (max-width: ${screen_tiny}) {
    button {
      font-size: 1rem;
    }
  }
`;
