import React, { useEffect } from "react";
import { Paragraph, Flex } from "theme-ui";
import { SubText } from './SearchResult.styles';
import { SplitContainer } from './../../../../components/SplitContainer/SplitContainer';
import { SearchResultLeft } from "./SearchResultLeft";
import { SearchResultRight } from './SearchResultRight';
import { useMainView } from "@app/contexts/Bans/BansContexts";

export interface SearchResultProps {
  isValid: boolean;
  search: string;
};

export const SearchResult: React.FC<SearchResultProps> = (props) => {
  const { search, isValid } = props;
  const { setCurrentView, foundDomain } = useMainView();
  const { isAvailable, expireBlock } = foundDomain ?? { isAvailable: null, expireBlock: 0 };

  const proceedWithDomainHandler = () => {
    isValid && isAvailable && setCurrentView("REGISTER_DOMAIN");
  }

  return (
    <>
      {search && (
        <>
          <Paragraph variant="header">Results</Paragraph>
          <SplitContainer leftWeight={3} rightWeight={1}>
            <SearchResultLeft value={search + (search ? ".beam" : "")} expireBlock={expireBlock} isAvailable={isAvailable} isValid={isValid} handleClick={proceedWithDomainHandler}/>
            <SearchResultRight isAvailable={isAvailable} isValid={isValid} />
          </SplitContainer>
          <Flex>
            {
              !isValid && (
                <SubText sx={{ fontSize: '14px' }}>Domain should contain only letters and numbers</SubText>
              )
            }
            {
              foundDomain && foundDomain.isYourOwn && (
                <SubText sx={{ fontSize: '14px' }}>Your are already own the domain</SubText>
              )
            }
          </Flex>
        </>
      )}
    </>
  );
}
