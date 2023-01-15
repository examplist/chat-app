import styled from 'styled-components';
import * as color from 'styles/color';

const edit_mode = '.edit-mode';

export const Section = styled.section`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

export const Text = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;
  font-size: 1.5rem;

  ${edit_mode} & {
    display: none;
  }
`;

export const Button = styled.button`
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: none;
  border-radius: 0;
  width: 4rem;
  height: 2rem;
`;

export const Input = styled.input`
  padding: 0 0.5rem;
  font-size: 1.25rem;
  width: 12rem;
  display: none;
  margin-right: 1rem;

  ${edit_mode} & {
    display: block;
  }
`;

export const Edit = styled(Button)`
  background-color: ${color.turquoise};

  &:hover {
    background-color: ${color.greensea};
  }

  ${edit_mode} & {
    display: none;
  }
`;

export const Cancel = styled(Button)`
  display: none;
  background-color: ${color.emerald};
  margin-right: 1rem;

  &:hover {
    background-color: ${color.nephritis};
  }

  ${edit_mode} & {
    display: block;
  }
`;

export const Confirm = styled(Button)`
  display: none;
  background-color: ${color.peterriver};

  &:hover {
    background-color: ${color.belizehole};
  }

  ${edit_mode} & {
    display: block;
  }
`;
