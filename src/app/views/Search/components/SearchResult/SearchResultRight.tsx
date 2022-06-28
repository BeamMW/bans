import React from 'react';
import styled from 'styled-components';
import { Flex, Text } from "theme-ui";
import Button from '../../../../components/Button';
import { textStyles, SearchResultStyleProps } from './SearchResult.styles';
import Heart from '../../../../assets/icons/heart.svg';
import HeartActive from '../../../../assets/icons/heart-active.svg';
import { createFavoriteBans, deleteFavoriteBansByName } from '@app/library/bans/userLocalDatabase/dao/userFavorites';
import { userDatabase } from '@app/library/bans/userLocalDatabase/database';
import { FavoriteBans } from '@app/library/bans/userLocalDatabase/domainObject';
import { DomainPresenter, DomainPresenterType } from '@app/library/bans/DomainPresenter';
import { useIsBansFavorite } from '@app/hooks/useIsBansFavorite';
import { useHandleHeartAction } from '@app/hooks/useHandleHeartAction';


const Container = styled(Flex)`
justify-content: end;
align-items: center;
`

interface SearchResultProps extends SearchResultStyleProps {
  isValid: boolean;
  domain?: DomainPresenterType;
  search: string;
}
  const getAvailableStatusText = (isValid: boolean, isAvailable: boolean) => {
    if (!isValid) {
      return "invalid domain";
    }
    if(!isAvailable) {
      return "not available";
    }
    if(isAvailable) {
      return "available";
    }
  }

export const SearchResultRight:React.FC<SearchResultProps> = (props) => {
  const { isValid, isAvailable, domain, search } = props;
  const isBansLove = useIsBansFavorite(search);
  const heartHandler = useHandleHeartAction(isBansLove, search);

  return (
    <Container>
    <Flex sx={{ mr: 4 }}>
      {
        domain && (
          <Button variant='icon' pallete='opacity' onClick={heartHandler}>
            {!!isBansLove && isBansLove.length ? <HeartActive/> : <Heart />}
          </Button>
        )
      }
    </Flex>
    <Flex>
      <Text sx={textStyles(props)}>
      { getAvailableStatusText(isValid, isAvailable) }
      </Text>
    </Flex>
  </Container>
  )
}