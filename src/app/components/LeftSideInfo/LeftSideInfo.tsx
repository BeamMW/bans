import { HeartIcon } from "@app/assets/icons";
import { GROTHS_IN_BEAM } from "@app/constants";
import { useHandleHeartAction } from "@app/hooks/useHandleHeartAction";
import { useIsBansFavorite } from "@app/hooks/useIsBansFavorite";
import { DomainPresenterType } from "@app/library/bans/DomainPresenter";
import React from "react";
import styled from 'styled-components';
import { Box, Flex, Text } from "theme-ui";
import Button from "../Button";
import Heart from '@app/assets/icons/heart.svg';
import GiftIcon from '@app/assets/icons/gift.svg';

import HeartActive from '@app/assets/icons/heart-active.svg';

interface SubTextProps {
  isexpired: boolean;
}
export const SubText = styled(Text) <SubTextProps>`
  font-family: 'SFProDisplay';
  font-style: italic;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: ${({ isExpired }) => isExpired ? '#FF746B' : 'rgba(255, 255, 255, 0.5)'};
  display: block;
  padding-top: 6px;
  white-space: nowrap;
`
interface LeftSideProps {
  domain: DomainPresenterType;
  showHeart?: boolean
};

export const LeftSide: React.FC<LeftSideProps> = ({ domain, showHeart }) => {
  const { name, expiresAt, isExpired, isOnSale, price } = domain;

  //refactor move to another compnent for optimization issues
  const isBansLove = useIsBansFavorite(domain.name);
  const heartHandler = useHandleHeartAction(isBansLove, domain.name);

  return (
    <Flex sx={{ variant: 'layout.card', flexDirection: 'row' }}>
      <Flex sx={{ marginRight: '20px', alignItems: 'center' }}>
        <GiftIcon/>
      </Flex>
      <Box>
        <Text>{name}.beam</Text>

        {expiresAt ? <SubText isexpired={isExpired.toString()}>Block expire {expiresAt}</SubText> : <></>}
      </Box>
      {
        showHeart && (
          <Box>
            <Button variant='icon' pallete='opacity' onClick={heartHandler}>
              {!!isBansLove && isBansLove.length ? <HeartActive /> : <Heart />}
            </Button>
          </Box>
        )
      }
    </Flex>
  )
}