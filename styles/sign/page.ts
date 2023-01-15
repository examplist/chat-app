import styled from 'styled-components';
import { height_header } from 'styles/layout';

export const Container = styled.main`
  min-height: calc(100vh - ${height_header});
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

export const LoggedIn = styled.section`
  font-size: 2rem;
`;
