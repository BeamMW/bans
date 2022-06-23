import React from "react";
import { Box, Flex } from "theme-ui";

interface ButtonContainerProps {
  children: React.ReactNode[];
}

export const ButtonContainer: React.FC<ButtonContainerProps> = ({ children }) => {
  const [left, right] = children;

  return (
    <Flex sx={{ justifyContent: 'center' }}>
      <Box sx={{ mr: '30px' }}>
        { left }
      </Box>
      <Box >
        { right }
      </Box>
    </Flex>
  )
}