import React, { useEffect, useState } from "react";
import { Flex, Text, Divider, Box } from 'theme-ui';
import styled from "styled-components";
import Plus from '../../assets/icons/blue-plus.svg';
import { useBansApi, useBansView } from "@app/contexts/Bans/BansContexts";
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

export const Register: React.FC = () => {
  const TRANSACTION_ID = "DOMAIN_REGISTER";

  const transactionState = useCurrentTransactionState(TRANSACTION_ID);
  const isTransactionPending = IsTransactionPending({transactionIdPrefix: TRANSACTION_ID});

  const [period, setPeriod] = useState<number>(1);
  const {search, setView} = useBansView();

  const backButtonHandler = () => setView("SEARCH");
  const periodDecrease = () => period > 1 && setPeriod(period - 1);

  useEffect(() => {
    if (useTransactionState.id === TRANSACTION_ID && transactionState.type === "completed") {

      setView("SEARCH");

      return () => {
        //store.dispatch()
      }
    }

  }, [transactionState, setView]);

  return (
    <>
      <Flex sx={{ justifyContent: 'center',mb: 40 }}>
        <BackButton handler={backButtonHandler} text="back" />
      </Flex>

      <Container>
        <Box>
          <RegistrationHeader search={search} />
          <Divider sx={{ my: 5 }} />
          <RegistrationPeriod period={period} periodDecrease={periodDecrease} setPeriod={setPeriod}/>
          <RegistrationPrice/>
          <Flex sx={{ flexDirection: 'column' }}>
            <Text variant="panelHeader">
              Current domain will be available from TBD till TBD.
            </Text>
            <RegisterAction
              transactionId={"DOMAIN_REGISTER"}
              change={period > 1 ? "registerDomainWithSetPeriod" : "registerDomain"}
              period={period}
            >
              <Plus />
              register
            </RegisterAction>
          </Flex>
        </Box>
        {isTransactionPending && <LoadingOverlay />}
      </Container>
    </>
  )
}