import styled from 'styled-components';
import { OnlyMessage, height_header } from 'styles/layout';

export const Loading = styled(OnlyMessage)``;

export const Error = styled(OnlyMessage)``;

export const NotIncluded = styled(OnlyMessage)``;

export const Container = styled.main`
  min-height: calc(100vh - ${height_header});
  display: flex;
  flex-direction: column;
`;
