import styled from 'styled-components';
import * as color from 'styles/color';

const img_size = '8rem';

export const Section = styled.section`
  margin-bottom: 2.25rem;
  display: flex;
  justify-content: center;
`;

export const Container = styled.div`
  width: ${img_size};
  height: ${img_size};
  position: relative;
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

export const Edit = styled.button`
  position: absolute;
  width: calc(${img_size} * 0.2);
  height: calc(${img_size} * 0.2);
  bottom: calc(${img_size} * -0.1);
  right: calc(${img_size} * -0.1);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${color.silver};
  border-radius: 0;
  background-color: ${color.clouds};

  &:hover {
    background-color: ${color.silver};
  }
`;
