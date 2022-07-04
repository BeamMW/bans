import React, { useEffect } from "react";
import { Paragraph, Flex, Text } from "theme-ui";
import { SubText } from './SearchResult.styles';
import { SplitContainer } from './../../../../components/SplitContainer/SplitContainer';
import { SearchResultLeft } from "./SearchResultLeft";
import { SearchResultRight } from './SearchResultRight';
import { useMainView } from "@app/contexts/Bans/BansContexts";
import { RegisterAction } from "@app/views/Register/RegisterAction";
import { useCurrentTransactionState } from "@app/library/transaction-react/useCurrentTransactionState";
import { IsTransactionPending } from "@app/library/transaction-react/IsTransactionStatus";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import { SearchResultForSale } from "./SearchResultForSale";
import { useModal } from "@app/components/Modals/useModal";

export interface SearchResultProps {
  isValid: boolean;
  search: string;
  isLoading: boolean;
};

export const SearchResult: React.FC<SearchResultProps> = (props) => {
  const { setCurrentView, foundDomain, setFoundDomain } = useMainView();
  const { isShown, toggle } = useModal();

  const { search, isValid, isLoading } = props;
  const { isAvailable, expiresAt } = foundDomain ?? { isAvailable: true, expireBlock: 0 };

  const showBorder = isAvailable && isValid;

  const proceedWithDomainHandler = () => {
    isValid && isAvailable && !foundDomain.isYourOwn && !foundDomain.isOnSale && setCurrentView("REGISTER_DOMAIN");
  }

  const searchResult = (
    <SplitContainer leftWeight={7} rightWeight={5} border={showBorder}>
      <SearchResultLeft domain={foundDomain} value={search + (search ? ".beam" : "")} expiresAt={expiresAt} isAvailable={isAvailable} isValid={isValid} handleClick={foundDomain && foundDomain.isOnSale ? () => {toggle(), console.log(777)} : proceedWithDomainHandler} />
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
        )
      }
    </>
  );
}
