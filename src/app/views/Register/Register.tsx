import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Flex, Text, Divider, Box } from 'theme-ui';
import styled from "styled-components";
import Plus from '../../assets/icons/blue-plus.svg';
import { useBansApi, useMainView } from "@app/contexts/Bans/BansContexts";
import { RegisterAction } from "./RegisterAction";
import { LoadingOverlay } from "@app/components/LoadingOverlay";
import { BackButton } from "@app/components/BackButton/BackButton";
import { useTransactionState } from "@app/library/transaction-react/context/TransactionContext";
import { IsTransactionPending } from "@app/library/transaction-react/IsTransactionStatus";
import { useCurrentTransactionState } from "@app/library/transaction-react/useCurrentTransactionState";
import { RegistrationPeriod } from "@app/components/RegistrationPeriod/RegistrationPeriod";
import { RegistrationPrice } from  "@app/components/RegistrationPrice/RegistrationPrice";
import { RegistrationHeader } from "@app/components/RegistrationHeader/RegistrationHeader";

const Container = styled.div`
  min-width: 630px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background-color: rgba(255,255,255,0.05);
  padding: 37px 20px 40px 20px;
  margin: 0 auto;
`;


const tillDate = (foundDomain, period) => useMemo(() => {
  if(foundDomain.expiresAt) return foundDomain.expiresAt;

  const current = new Date();
  current.setFullYear(current.getFullYear() + period);
  return current.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'});

}, [foundDomain, period])

export const Register: React.FC = () => {
  const {foundDomain, setFoundDomain, setCurrentView} = useMainView();

  const TRANSACTION_ID = foundDomain.isOnSale ? "DOMAIN_BUYING" : "DOMAIN_REGISTER";

  const transactionState = useCurrentTransactionState(TRANSACTION_ID);
  const isTransactionPending = IsTransactionPending({transactionIdPrefix: TRANSACTION_ID});

  const [period, setPeriod] = useState<number>(1);

  const backButtonHandler = () => setCurrentView("REGISTER_CLOSED");

  const {name: domainName} = foundDomain;

  const currentTime = new Date();
  const now = (currentTime.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}));

  const till = tillDate(foundDomain, period);

  useEffect(() => {
    if (transactionState.id === TRANSACTION_ID && transactionState.type === "completed") {
      //dispatch to the main search view and clear found domain data
      setCurrentView("REGISTER_COMPLETED") || setFoundDomain(null); 

      return () => {
        //store.dispatch()
      }
    }

  }, [transactionState, setCurrentView]);

  return (
    <>
      <Flex sx={{ justifyContent: 'center',mb: 40 }}>
        <BackButton handler={backButtonHandler} text="back" />
      </Flex>

      <Container>
        <Box>
          <RegistrationHeader search={domainName} />
          <Divider sx={{ my: 5 }} />
          {!foundDomain.isOnSale ? <RegistrationPeriod period={period} setPeriod={setPeriod}/> : <></>}
          <RegistrationPrice isOnSale={foundDomain.isOnSale} price={foundDomain.price} period={period} />
          <Flex sx={{ flexDirection: 'column'}}>
            <Text variant="panelHeader" sx={{mb:30}}>
              Current domain will be available from {now} till {till}.
            </Text>
            <RegisterAction
              transactionId={TRANSACTION_ID}
              change={foundDomain.isOnSale ? "buyDomain" : "registerDomain"}
              period={period}
              domain={foundDomain}
            >
              <Plus />
              {foundDomain.isOnSale ? "buy" : "register"}
            </RegisterAction>
          </Flex>
        </Box>
        {isTransactionPending && <LoadingOverlay />}
      </Container>
    </>
  )
}