import React from "react";
import { Flex, Text } from "theme-ui";
import { containerStyles, SearchResultStyleProps, SubText } from './SearchResult.styles';



interface SearchResultLeftProps extends SearchResultStyleProps {
  value: string;
  isValid: boolean;
  expireBlock: number;
}
export const SearchResultLeft: React.FC<SearchResultLeftProps> = (props) => {
  const { value, isAvailable, isValid, expireBlock} = props;
  return (
    <Flex sx={containerStyles(props)}>
      <Text>{value}</Text>
      { !isAvailable && isValid && (
          <SubText>Expires in {expireBlock} block</SubText>
      )}
    </Flex>
  )
}
