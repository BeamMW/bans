import React from "react";
import { Flex, Text } from "theme-ui";
import { containerStyles, SearchResultStyleProps, SubText } from './SearchResult.styles';



interface SearchResultLeftProps extends SearchResultStyleProps {
  value: string;
  isValid: boolean;
}
export const SearchResultLeft: React.FC<SearchResultLeftProps> = (props) => {
  const { value, isAvailable, isValid } = props;
  return (
    <Flex sx={containerStyles(props)}>
      <Text>{value}</Text>
      { !isAvailable && isValid && (
          <SubText>Expires on August 29, 2022</SubText>
      )}
    </Flex>
  )
}
