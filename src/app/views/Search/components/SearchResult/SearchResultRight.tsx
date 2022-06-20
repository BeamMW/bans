import React from 'react';
import styled from 'styled-components';
import { Flex, Text } from "theme-ui";
import Button from '../../../../components/Button';
import { textStyles, SearchResultStyleProps } from './SearchResult.styles';
import Heart from '../../../../assets/icons/heart.svg';


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
  return (
    <Container>
    <Flex sx={{ mr: 4 }}>
      {
        isAvailable && (
          <Button variant='icon' pallete='opacity'>
              <Heart />
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