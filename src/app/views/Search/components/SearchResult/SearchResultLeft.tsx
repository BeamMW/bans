import React from "react";
import { Box, Flex, Paragraph, Text } from "theme-ui";
import { DomainPresenterType } from "@app/library/bans/DomainPresenter";
import { containerStyles, SearchResultStyleProps, SubText } from './SearchResult.styles';



interface SearchResultLeftProps extends SearchResultStyleProps {
  domain?: DomainPresenterType
  value: string;
  isValid: boolean;
  expiresAt: string;
}

export const SearchResultLeft: React.FC<SearchResultLeftProps> = (props) => {
  const { value, isAvailable, isValid, expiresAt, domain } = props;
  const isYourOwn = domain && domain.isYourOwn;

  return (
    <Flex sx={containerStyles(props)}>
      <Flex>
        <Paragraph sx={{
              fontSize: '16px',
              fontFamily: 'SF Pro Display',
              fontWeight: 700,
              lineHeight: '19px',
              fontStyle: 'normal',
            }}>
              {value}
              <Text sx={{color: 'rgba(255,255,255,0.5)'}}>.beam</Text>
        </Paragraph>
        {
          isAvailable && (
            <Box sx={{
              background: ' rgba(0, 246, 210, 0.2)',
              borderRadius: '4px',
              marginLeft: '14px'
            }}>
              {
                domain && domain.isOnSale &&
                <Text sx={{
                  color: 'rgba(0, 246, 210, 1)',
                  fontSize: '12px',
                  fontStyle: 'italic',
                  padding: '2px 6px 2px 6px'
                }}>{isYourOwn ? "you sale the domain" : "available for resale"}</Text>
              }
            </Box>
          )}
      </Flex>
      {!isAvailable && isValid && (
        <SubText>Expires on {expiresAt}</SubText>
      )}
      {domain && domain.isOnSale && (
        <SubText>Expires on {expiresAt}</SubText>
      )}
    </Flex>
  )
}
