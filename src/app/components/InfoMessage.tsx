import React from 'react';
import { Box, Flex, Heading, Text } from "theme-ui";

/* import { Icon } from "./Icon"; */

type InfoMessageProps = {
  title: string;
  icon?: React.ReactNode;
};

export const InfoMessage: React.FC<InfoMessageProps> = ({ title, children, icon }) => (
  <Box sx={{ mx: 1, mb: 3 }}>
    <Flex sx={{ alignItems: "center", textAlign:"center", mb: "10px" }}>

      <Heading as="h4" sx={{fontSize:0, fontWeight: "medium", color:"#ffffff7a", lineHeight:"16px"}}>{title}</Heading>
    </Flex>

    <Text sx={{ fontSize: 2 }}>{children}</Text>
  </Box>

);