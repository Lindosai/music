import styled from '@emotion/styled';

export const MessageWrapper = styled.div`
  position: fixed;
  left: 50%;
  bottom: 40px;
  z-index: 9;
  transform: translateX(-50%);
  border-radius: 8px;

  .MuiSnackbar-root {
    position: relative;
  }

  .MuiPaper-root {
    min-width: unset;
    background: rgba(0, 0, 0, .5);
  }
`;
