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
import { DomainPresenterType } from '@app/library/bans/DomainPresenter';
import { useIsBansFavorite } from '@app/hooks/useIsBansFavorite';
import { useHandleHeartAction } from '@app/hooks/useHandleHeartAction';
import RedHeart from '../../../../assets/icons/red-heart.svg';
import { Amount } from '@app/components/Amount/Amount';

const Container = styled(Flex)`
justify-content: end;
align-items: center;
`

interface SearchResultProps extends SearchResultStyleProps {
  isValid: boolean;
  domain?: DomainPresenterType;
  search: string;
}
  const getAvailableStatusText = (isValid: boolean, isAvailable: boolean, isOnSale: boolean) => {
    if (!isValid) {
      return "invalid domain";
    }
    if(!isAvailable && !isOnSale) {
      return "not available";
    }
    if(isAvailable && !isOnSale) {
      return "available";
    }
    if(isAvailable && isOnSale) {
      return "on sale";
    }
  }

export const SearchResultRight:React.FC<SearchResultProps> = (props) => {
  const { isValid, isAvailable, domain, search } = props;
  const isBansLove = useIsBansFavorite(search);
  const heartHandler = useHandleHeartAction(isBansLove, search);
  const isYourOwn = domain && domain.isYourOwn;
  const isOnSale =  domain && domain.isOnSale;

  const [liked, setLiked] = React.useState(false);
  const toggleLike = () => setLiked(!liked);
  const status = getAvailableStatusText(isValid, isAvailable, isOnSale);
  const ONSALE = 'on sale';

  const handleBuyClick = () => {
    if(status === ONSALE) {
      //do your stafe
      return;
    }
    return;
  }
  return (
    <Container sx={{ justifyContent: 'flex-end!important' }}>
    <Flex sx={{ mr: 4 }}>
      {

        <Amount size='14px' value='400'/>
      }
      {
        domain && (
          <Button variant='icon' pallete='opacity' onClick={heartHandler}>
            {!!isBansLove && isBansLove.length ? <HeartActive/> : <Heart />}
          </Button>
        )
      }
    </Flex>
    <Flex>
      <Text sx={isYourOwn || isOnSale ? {color: "#00F6D2"} : textStyles(props)} onClick={handleBuyClick}>
      {isYourOwn ? "your domain" : status === ONSALE ? 'buy' : status}
      </Text>
    </Flex>
  </Container>
  )
}