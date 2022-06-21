import React from "react";
import styled from 'styled-components';
import { Flex, Text } from "theme-ui";

interface SubTextProps {
  isExpired: boolean;
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
interface LeftSideProps extends SubTextProps {
  name: string;
  expiresAt: string;
};

export const LeftSide: React.FC<LeftSideProps> = ({ name, expiresAt,isExpired }) => {
  return (
    <Flex sx={{ variant: 'layout.card' }}>
      <Text>{name}</Text>
      <SubText isExpired={isExpired}>{expiresAt}</SubText>
    </Flex>
  )
}