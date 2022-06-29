import React from "react";
import { Flex, Text } from "theme-ui";
import { containerStyles, SearchResultStyleProps, SubText } from './SearchResult.styles';



interface SearchResultLeftProps extends SearchResultStyleProps {
  value: string;
  isValid: boolean;
  expiredAt: string;
  handleClick: () => void;
}
export const SearchResultLeft: React.FC<SearchResultLeftProps> = (props) => {
  const { value, isAvailable, isValid, expiredAt, handleClick} = props;
  return (
    <Flex sx={containerStyles(props)} onClick={handleClick}>
      <Text>{value}</Text>
      { !isAvailable && isValid && (
          <SubText>Expires on {expiredAt}</SubText>
      )}
    </Flex>
  )
}
