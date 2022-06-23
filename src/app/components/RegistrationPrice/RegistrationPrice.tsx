import React from "react";
import { Flex, Text } from 'theme-ui';
import { Amount } from "../Amount/Amount";

interface PriceProps {
  price?: string;
}

export const RegistrationPrice: React.FC<PriceProps> = ({ price }) => {
  return (
    <Flex sx={{ mt: 24, mb: 5 }}>
      <Text variant="panelHeader">
        Registration price
      </Text>
      <Amount value='TBD' size="14px" />
    </Flex>
  )
}