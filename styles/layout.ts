import styled from 'styled-components';

// 모든 곳에 적용되는 길이
export const height_header = '5rem';
export const height_category_when_narrow = '4rem';

// 반응형
export const screen_tiny = '473px';
export const screen_small = '640px';
export const screen_medium = '768px';

// 메시지만 있는 컴포넌트
export const OnlyMessage = styled.main`
  min-height: calc(100vh - ${height_header});
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  padding: 1.5rem;
`;

export const OnlyMessageInHome = styled(OnlyMessage)`
  min-height: calc(100vh - ${height_header} - ${height_category_when_narrow});
  /* 넓은 화면에서 가로로 늘려야 한다. */
  flex-grow: 1;
`;
