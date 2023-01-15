import styled from 'styled-components';
import { OnlyMessage } from 'styles/layout';

export const Main = styled(OnlyMessage)`
  flex-direction: column;
`;

export const Message = styled.div`
  margin-bottom: 1rem;
`;

export const LinkToHome = styled.div`
  a {
    text-decoration: none;
    color: #666;
  }
`;
