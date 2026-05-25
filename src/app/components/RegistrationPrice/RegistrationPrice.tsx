import { PriceInfo } from "@app/library/bans/DomainPresenter";
import React from "react";
import { Flex, Text } from 'theme-ui';
import { Amount } from "../Amount/Amount";
import _ from 'lodash';
import BeamDappConnector from "@core/BeamDappConnector.js";

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
      <Amount value={_.round(BeamDappConnector.grothToBeam(computedPrice ?? 0), 2)}  size="14px" showConvertedToUsd={true}/>
    </Flex>
  )
}