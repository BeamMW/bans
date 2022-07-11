import { GROTHS_IN_BEAM } from "@app/constants";
import { PriceInfo } from "@app/library/bans/DomainPresenter";
import { Decimal } from "@app/library/base/Decimal";
import React from "react";
import { Flex, Text } from 'theme-ui';
import { Amount } from "../Amount/Amount";

interface PriceProps {
  price?: PriceInfo;
  period?: number;
  isOnSale?: boolean;
}

export const RegistrationPrice: React.FC<PriceProps> = ({ price, isOnSale, period }) => {
  const computedPrice = price.amount * period;
  return (
    <Flex sx={{ mt: 24, mb: 5 }}>
      <Text variant="panelHeader">
        {isOnSale ? "Selling price" : "Registration price"}
      </Text>
      <Amount value={Decimal.from(computedPrice ?? 0).div(GROTHS_IN_BEAM).toString()}  size="14px" showConvertedToUsd={true}/>
    </Flex>
  )
}