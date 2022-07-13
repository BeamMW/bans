import React, { useEffect } from "react";
import Skeleton from 'react-loading-skeleton';
import { Paragraph, Flex, Text } from "theme-ui";
import { useMainView } from "@app/contexts/Bans/BansContexts";
import { SplitContainer } from '@app/components/SplitContainer/SplitContainer';
import { useModal } from "@app/components/Modals/useModal";
import { SearchResultLeft } from "./SearchResultLeft";
import { SearchResultRight } from './SearchResultRight';
import { SearchResultForSale } from "./SearchResultForSale";

import 'react-loading-skeleton/dist/skeleton.css'
import { SubText } from './SearchResult.styles';

export interface SearchResultProps {
  isValid: boolean;
  search: string;
  isLoading: boolean;
};

export const SearchResult: React.FC<SearchResultProps> = (props) => {
  const { setCurrentView, foundDomain, setFoundDomain } = useMainView();
  const { isShown, toggle } = useModal();

  const { search, isValid, isLoading } = props;
  const { isAvailable, expiresAt, isYourOwn } = foundDomain ?? { isAvailable: true, expireBlock: 0, isYourOwn: false };

  const showBorder = (isYourOwn || isAvailable) && isValid;

  const proceedWithDomainHandler = () => {
    isValid && isAvailable && !foundDomain.isYourOwn && !foundDomain.isOnSale && setCurrentView("REGISTER_DOMAIN");
  }

  const searchResult = (
    <SplitContainer leftWeight={7} rightWeight={5} border={showBorder} handleClick={foundDomain && foundDomain.isOnSale ? () => toggle() : proceedWithDomainHandler}>
      <SearchResultLeft domain={foundDomain} value={search + (search ? ".beam" : "")} expiresAt={expiresAt} isAvailable={isAvailable} isValid={isValid} />
      <SearchResultRight search={search} domain={foundDomain} isAvailable={isAvailable} isValid={isValid} />
    </SplitContainer>
  );

  const skeletonResult = (
    <SplitContainer leftWeight={4} rightWeight={0}>
      <Flex sx={{
        flexDirection: 'column',
        padding: '30px 0px'
      }}>
        <Skeleton />
      </Flex>
      <></>
    </SplitContainer>
  );

  return (
    <>
      {
        search && (
          <>
            <Paragraph variant="header">Results</Paragraph>
            {isLoading ? (skeletonResult) : (
              <>
                {foundDomain && foundDomain.isOnSale && !foundDomain.isYourOwn ? (
                  <>
                    {searchResult}
                    <SearchResultForSale isShown={isShown} toggleClose={toggle} />
                  </>
                ) : (
                  <>
                    {searchResult}
                  </>
                )}
                <Flex>
                  {
                    !isValid && (
                      <SubText sx={{ fontSize: '14px' }}>Domain should contain at least 3 characters, only latin letters, numbers and special signs - _ ~ are allowed</SubText>
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
        )
      }
    </>
  );
}
