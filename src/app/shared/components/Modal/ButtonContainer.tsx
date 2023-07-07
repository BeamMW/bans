import React from 'react';

import { styled } from '@linaria/react';

interface ButtonContainerProps {
  children: React.ReactNode[];
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.875rem;
`;
const Box = styled.div`
  display: flex;
  margin-right: 1.875rem;
`;

export const ButtonContainer: React.FC<ButtonContainerProps> = ({ children }) => {
  const [left, right] = children;
  return (
    <Container>
      <Box>
        { left }
      </Box>
      <Box>
        { right }
      </Box>
    </Container>
  );
};
