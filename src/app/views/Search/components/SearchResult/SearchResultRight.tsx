import React from 'react';
import styled from 'styled-components';
import { Flex, Text } from "theme-ui";
import { DomainPresenterType } from '@app/library/bans/DomainPresenter';
import { useIsBansFavorite } from '@app/hooks/useIsBansFavorite';
import Button from '@app/components/Button';
import { useHandleHeartAction } from '@app/hooks/useHandleHeartAction';
import { Amount } from '@app/components/Amount/Amount';
import { Decimal } from '@app/library/base/Decimal';
import { GROTHS_IN_BEAM } from '@app/constants';

import Heart from '@app/assets/icons/heart.svg';
import HeartActive from '@app/assets/icons/heart-active.svg';
import { textStyles, SearchResultStyleProps } from './SearchResult.styles';

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

  const handleBuyClick = () => {
    /* if(status === ONSALE) {
      //do your stafe
      return;
    }
    return; */
  }
  
  return (
    <Container sx={{ justifyContent: 'flex-end!important' }}>
    <Flex sx={{ mr: 4, alignItems:'center' }}>
     {
        domain && isOnSale &&
        <Amount size='14px' value={Decimal.from(domain.price.amount / GROTHS_IN_BEAM).toString()}/>
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
      <Text sx={isYourOwn || isOnSale ? {color: "#00F6D2", whiteSpace: 'nowrap'} : textStyles(props)} onClick={handleBuyClick}>
      {isYourOwn ? "your domain" : (isAvailable && isOnSale ? 'buy' : status)}
      </Text>
    </Flex>
  </Container>
  )
}