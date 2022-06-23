import React from "react";
import { Flex, Text } from 'theme-ui';
import Button from "../Button";
import Heart from '../../assets/icons/heart.svg';

interface HeaderProps {
  search?: string;
}

export const RegistrationHeader: React.FC<HeaderProps> = ({ search }) => {
  return (
    <Flex>
    <Text variant="panelHeader">
      {search}.beam
    </Text>
    <Button variant='icon' pallete='opacity' style={{ margin: 0 }}>
      <Heart />
    </Button>
  </Flex>
  )
}