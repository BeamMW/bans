import { GROTHS_IN_BEAM } from "@app/constants";
import { DomainPresenterType } from "@app/library/bans/DomainPresenter";
import React from "react";
import styled from 'styled-components';
import { Flex, Text } from "theme-ui";

interface SubTextProps {
  isexpired: boolean;
}
export const SubText = styled(Text)<SubTextProps>`
  font-family: 'SFProDisplay';
  font-style: italic;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: ${({ isExpired }) => isExpired ? '#FF746B' : 'rgba(255, 255, 255, 0.5)' };
  display: block;
  padding-top: 6px;
  white-space: nowrap;
`
interface LeftSideProps {
  domain: DomainPresenterType;
};

export const LeftSide: React.FC<LeftSideProps> = ({ domain }) => {
  const {name, expiresAt,isExpired, isOnSale, price} = domain;

  return (
    <Flex sx={{ variant: 'layout.card' }}>
      <Text>{name}.beam</Text>

      {expiresAt ?  <SubText isexpired={isExpired.toString()}>Block expire {expiresAt}</SubText> :<></> }
    </Flex>
  )
}