import React from "react";
import { Box, Flex, Text } from "theme-ui";

import { Icon } from "./Icon";

export const ErrorDescription: React.FC = ({ children }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",

      mb: [2, 3],
      p: 3,

      bg: "#bb6d6d"
    }}
  >
    <Flex sx={{ alignItems: "center" }}>
      <Icon name="exclamation-triangle" size="lg" />
      <Text sx={{ ml: 2 }}>{children}</Text>
    </Flex>
  </Box>
);
