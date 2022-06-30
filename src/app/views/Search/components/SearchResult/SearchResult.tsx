import React, { useEffect } from "react";
import { Paragraph, Flex } from "theme-ui";
import { SubText } from './SearchResult.styles';
import { SplitContainer } from './../../../../components/SplitContainer/SplitContainer';
import { SearchResultLeft } from "./SearchResultLeft";
import { SearchResultRight } from './SearchResultRight';
import { useMainView } from "@app/contexts/Bans/BansContexts";
import { RegisterAction } from "@app/views/Register/RegisterAction";
import { useCurrentTransactionState } from "@app/library/transaction-react/useCurrentTransactionState";
import { IsTransactionPending } from "@app/library/transaction-react/IsTransactionStatus";

export interface SearchResultProps {
  isValid: boolean;
  search: string;
};

export const SearchResult: React.FC<SearchResultProps> = (props) => {
  const TRANSACTION_ID = "DOMAIN_BUYING";

  const transactionState = useCurrentTransactionState(TRANSACTION_ID);
  const isTransactionPending = IsTransactionPending({ transactionIdPrefix: TRANSACTION_ID });

  const { setCurrentView, foundDomain, setFoundDomain } = useMainView();

  useEffect(() => {
    if (transactionState.id === TRANSACTION_ID && transactionState.type === "completed") {
      //dispatch to the main search view and clear found domain data
      setCurrentView("REGISTER_COMPLETED") || setFoundDomain(null);

      return () => {
        //store.dispatch()
      }
    }

  }, [transactionState, setCurrentView]);

  const { search, isValid } = props;
  const { isAvailable, expiresAt } = foundDomain ?? { isAvailable: false, expireBlock: 0 };
  const showBorder = isAvailable && isValid;
  const proceedWithDomainHandler = () => {
    isValid && isAvailable && !foundDomain.isYourOwn && !foundDomain.isOnSale && setCurrentView("REGISTER_DOMAIN");
  }

  const searchResult = (
    <SplitContainer leftWeight={3} rightWeight={1} border={showBorder}>
      <SearchResultLeft domain={foundDomain} value={search + (search ? ".beam" : "")} expiresAt={expiresAt} isAvailable={isAvailable} isValid={isValid} handleClick={proceedWithDomainHandler} />
      <SearchResultRight search={search} domain={foundDomain} isAvailable={isAvailable} isValid={isValid} />
    </SplitContainer>
  );

  return (
    <>
      {search && (
        <>
          <Paragraph variant="header">Results</Paragraph>
          {foundDomain && foundDomain.isOnSale && !foundDomain.isYourOwn ? (
            <RegisterAction
              transactionId={TRANSACTION_ID}
              change={"buyDomain"}
              domain={foundDomain}
              isPure={true}
            >
              {searchResult}
            </RegisterAction>) : (
            <>
              {searchResult}
            </>
          )
          }

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
