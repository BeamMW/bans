import React from 'react';
import styled from 'styled-components';
import { Flex, Text } from "theme-ui";
import Button from '../../../../components/Button';
import { textStyles, SearchResultStyleProps } from './SearchResult.styles';
import Heart from '../../../../assets/icons/heart.svg';
import { createFavoriteBans } from '@app/library/bans/userLocalDatabase/dao/userFavorites';
import { userDatabase } from '@app/library/bans/userLocalDatabase/database';
import { FavoriteBans } from '@app/library/bans/userLocalDatabase/domainObject';
import { DomainPresenter } from '@app/library/bans/DomainPresenter';
import RedHeart from '../../../../assets/icons/red-heart.svg';


const Container = styled(Flex)`
justify-content: end;
align-items: center;
`

interface SearchResultProps extends SearchResultStyleProps {
  isValid: boolean;
  domain?: DomainPresenter;
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
  const { isValid, isAvailable, domain } = props;
  const [liked, setLiked] = React.useState(false);
  const toggleLike = () => setLiked(!liked);
  return (
    <Container>
    <Flex sx={{ mr: 4 }}>
      {
        /* isAvailable && */ domain && (
          <Button variant='icon' pallete='opacity' onClick={()=> { createFavoriteBans(userDatabase, new FavoriteBans(domain.name)), toggleLike() }}>
              { liked ? <RedHeart/ > : <Heart /> }
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