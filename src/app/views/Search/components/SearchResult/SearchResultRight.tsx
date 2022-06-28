import React from 'react';
import styled from 'styled-components';
import { Flex, Text } from "theme-ui";
import Button from '../../../../components/Button';
import { textStyles, SearchResultStyleProps } from './SearchResult.styles';
import Heart from '../../../../assets/icons/heart.svg';
import RedHeart from '../../../../assets/icons/red-heart.svg';


const Container = styled(Flex)`
justify-content: end;
align-items: center;
`

interface SearchResultProps extends SearchResultStyleProps {
  isValid: boolean;
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
  const { isValid, isAvailable } = props;
  const [liked, setLiked] = React.useState(false);
  const toggleLike = () => setLiked(!liked);
  return (
    <Container>
    <Flex sx={{ mr: 4 }}>
      {
        isAvailable && isValid && (
          <Button variant='icon' pallete='opacity' onClick={toggleLike}>
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