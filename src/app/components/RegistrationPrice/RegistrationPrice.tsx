import { GROTHS_IN_BEAM } from "@app/constants";
import { PriceInfo } from "@app/library/bans/DomainPresenter";
import { Decimal } from "@app/library/base/Decimal";
import React from "react";
import { Flex, Text } from 'theme-ui';
import { Amount } from "../Amount/Amount";

interface PriceProps {
  price?: PriceInfo;
  period?: number;
}

export const RegistrationPrice: React.FC<PriceProps> = ({ price, isOnSale, period }) => {
  return (
    <Flex sx={{ mt: 24, mb: 5 }}>
      <Text variant="panelHeader">
        {isOnSale ? "Selling price" : "Registration price"}
      </Text>
    </Flex>
  )
}