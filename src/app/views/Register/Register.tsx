import React, { useEffect, useState } from "react";
import { Flex, Text, Divider, Box } from 'theme-ui';
import Button from "../../components/Button";
import styled from "styled-components";
import { Amount } from "../../components/Amount/Amount";
import Heart from '../../assets/icons/heart.svg';
import Plus from '../../assets/icons/blue-plus.svg';
import YearMinus from '../../assets/icons/year-minus.svg';
import YearPlus from '../../assets/icons/year-plus.svg';
import { useBansApi, useBansView } from "@app/contexts/Bans/BansContexts";
import { RegisterAction } from "./RegisterAction";
import { LoadingOverlay } from "@app/components/LoadingOverlay";
import { BackButton } from "@app/components/BackButton/BackButton";
import { useTransactionState } from "@app/library/transaction-react/context/TransactionContext";
import { IsTransactionPending } from "@app/library/transaction-react/IsTransactionStatus";
import { useCurrentTransactionState } from "@app/library/transaction-react/useCurrentTransactionState";

const Container = styled.div`
  max-width: 630px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background-color: rgba(255,255,255,0.05);
  padding: 37px 20px 40px 20px;
  margin: 0 auto;
`;

const iconStyle = {
  cursor: "pointer",
};

const iconStyleShade = {...iconStyle, ...{opacity:0.5}}

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
          <Flex >
            <Text variant="panelHeader">
              {search}.beam
            </Text>
            <Button variant='icon' pallete='opacity' style={{ margin: 0 }}>
              <Heart />
            </Button>
          </Flex>
          <Divider sx={{ my: 5 }} />
          <Flex>
            <Text variant="panelHeader">
              Registration period
            </Text>
            <YearMinus style={period > 1 ? iconStyle : iconStyleShade} onClick={() => { periodDecrease() }} />
            <Text sx={{ mx: '12px' }}>{period}</Text>
            <YearPlus style={iconStyle} onClick={() => { setPeriod(period + 1) }} />
          </Flex>
          <Flex sx={{ mt: 24, mb: 5 }}>
            <Text variant="panelHeader">
              Registration price
            </Text>
            <Amount value='TBD' size="14px" />
          </Flex>
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