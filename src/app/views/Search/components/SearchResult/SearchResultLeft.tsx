import { DomainPresenterType } from "@app/library/bans/DomainPresenter";
import React from "react";
import { Box, Flex, Text } from "theme-ui";
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
      <Flex>
      <Text>{value}</Text>
      {
      isAvailable && ( 
      <Box sx={{
        background:' rgba(0, 246, 210, 0.2)',
        borderRadius: '4px',
        marginLeft: '14px'
        }}>
      <Text sx={{
        color:'rgba(0, 246, 210, 1)',
        fontSize: '12px',
        fontStyle: 'italic',
        padding: '2px 6px 2px 6px'
      }}>available for resale</Text>
        
      </Box>
    )}
      </Flex>
      { !isAvailable && isValid && (
          <SubText>Expires on {expiresAt}</SubText>
      )}
    </Flex>
  )
}
