import React, { useCallback } from "react";
import { Flex, Text } from 'theme-ui';
import Button from "../Button";
import Heart from '../../assets/icons/heart.svg';
import HeartActive from '../../assets/icons/heart-active.svg';
import { FavoriteBans } from "@app/library/bans/userLocalDatabase/domainObject";
import { createFavoriteBans, deleteFavoriteBansByName } from "@app/library/bans/userLocalDatabase/dao/userFavorites";
import { useIsBansFavorite } from "@app/hooks/useIsBansFavorite";
import { useHandleHeartAction } from "@app/hooks/useHandleHeartAction";

interface HeaderProps {
  search?: string;
}

export const RegistrationHeader: React.FC<HeaderProps> = ({ search }) => {
  const isBansLove = useIsBansFavorite(search);
  const heartHandler = useHandleHeartAction(isBansLove, search);

  return (
    <Flex>
      <Text variant="panelHeader">
        {search}.beam
      </Text>
      <Button variant='icon' pallete='opacity' style={{ margin: 0 }} onClick={heartHandler}>
        {!!isBansLove && isBansLove.length ? <HeartActive /> : <Heart />}
      </Button>
    </Flex>
  )
}