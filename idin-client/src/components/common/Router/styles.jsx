import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  ${(props) => (props.isLoggedIn ? 'background-color: #4F4F4F;' : '')}
`;
