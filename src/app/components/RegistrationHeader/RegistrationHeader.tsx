import React from "react";
import { Flex, Text } from 'theme-ui';
import Button from "../Button";
import Heart from '../../assets/icons/heart.svg';
import { FavoriteBans } from "@app/library/bans/userLocalDatabase/domainObject";
import { createFavoriteBans, readAllFavoriteBans } from "@app/library/bans/userLocalDatabase/dao/userFavorites";
import { database } from "@app/library/bans/userLocalDatabase/database";

interface HeaderProps {
  search?: string;
}

export const RegistrationHeader: React.FC<HeaderProps> = ({ search }) => {
  console.log(database);
  console.log(readAllFavoriteBans(database));
  return (
    <Flex>
    <Text variant="panelHeader">
      {search}.beam
    </Text>
    <Button variant='icon' pallete='opacity' style={{ margin: 0 }} onClick={()=> createFavoriteBans(database, new FavoriteBans(search))}>
      <Heart />
    </Button>
  </Flex>
  )
}