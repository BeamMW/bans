import { DomainPresenterType } from "@app/library/bans/DomainPresenter";
import React from "react";
import { Flex, Text } from "theme-ui";
import { containerStyles, SearchResultStyleProps, SubText } from './SearchResult.styles';



interface SearchResultLeftProps extends SearchResultStyleProps {
  domain?: DomainPresenterType
  value: string;
  isValid: boolean;
  expiresAt: string;
  handleClick: () => void;
}
export const SearchResultLeft: React.FC<SearchResultLeftProps> = (props) => {
  const { value, isAvailable, isValid, expiresAt, handleClick} = props;
  return (
    <Flex sx={containerStyles(props)} onClick={handleClick}>
      <Text>{value}</Text>
      { !isAvailable && isValid && (
          <SubText>Expires on {expiresAt}</SubText>
      )}
    </Flex>
  )
}
