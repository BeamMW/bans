import React, { useEffect, useMemo, useState } from "react";
import moment from "moment";
import store from "index";
import { Flex, Text, Divider, Box } from 'theme-ui';
import styled from "styled-components";
import { useMainView } from "@app/contexts/Bans/BansContexts";
import { RegisterAction } from "@app/views/Actions/RegisterAction";
import { LoadingOverlay } from "@app/components/LoadingOverlay";
import { BackButton } from "@app/components/BackButton/BackButton";
import { useTransactionState } from "@app/library/transaction-react/context/TransactionContext";
import { useCurrentTransactionState } from "@app/library/transaction-react/useCurrentTransactionState";
import { RegistrationPeriod } from "@app/components/RegistrationPeriod/RegistrationPeriod";
import { RegistrationPrice } from "@app/components/RegistrationPrice/RegistrationPrice";
import { RegistrationHeader } from "@app/components/RegistrationHeader/RegistrationHeader";
import { reloadAllUserInfo } from "@app/store/BansStore/actions";
import Plus from '@app/assets/icons/blue-plus.svg';
import { IsTransactionPending } from "@app/library/transaction-react/IsTransactionStatus";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserDomains } from "@app/store/BansStore/selectors";
import useCalculateDomainPrice from "@app/hooks/useCalculateDomainPrice";

const Container = styled.div`
  min-width: 630px;
  display: flex;
  font-family: 'SFProDisplay';
  flex-direction: column;
  border-radius: 10px;
  background-color: rgba(255,255,255,0.05);
  padding: 37px 20px 40px 20px;
  margin: 0 auto;
  user-select: none;
`;


export const Register: React.FC = () => {
  const TRANSACTION_ID = "DOMAIN_REGISTER";

  const navigate = useNavigate();

  const transactionState = useCurrentTransactionState(TRANSACTION_ID);
  const isTransactionPending = IsTransactionPending({ transactionIdPrefix: TRANSACTION_ID });

  const [period, setPeriod] = useState<number>(1);
  const { foundDomain, setFoundDomain, setCurrentView } = useMainView();

  const backButtonHandler = () => setCurrentView("REGISTER_CLOSED");

  const { name: domainName } = foundDomain;

  const price = useCalculateDomainPrice(domainName);

  const now = moment().format("LL");

  const userBans: Array<any> = useSelector(selectUserDomains());

  const till = useMemo(() => {
    if (foundDomain.expiresAt) return foundDomain.expiresAt;
    return moment().add(period, 'years').format("LL");
  }, [period]);

  useEffect(() => {
    if (transactionState.id === TRANSACTION_ID && transactionState.type === "waitingForConfirmation") {
      //if user has not any domains we redirets user to my-page empty
      !userBans.length ? navigate("my-page") : null;
    }

    if (transactionState.id === TRANSACTION_ID && transactionState.type === "completed") {
      /* @TODO: refactor - load only specific domains */
      store.dispatch(reloadAllUserInfo.request())

      //dispatch to the main search view and clear found domain data
      setCurrentView("REGISTER_COMPLETED") || setFoundDomain(null) || navigate("my-page");

      return () => {
      }
    }

  }, [transactionState, setCurrentView, till]);

  return (
    <>
      <Flex sx={{ justifyContent: 'center', mb: 40 }}>
      </Flex>

      <Container>
        <Box>
          <RegistrationHeader search={domainName} />
          <Divider sx={{ my: 4 }} />
          <RegistrationPeriod period={period} setPeriod={setPeriod} />
          <RegistrationPrice price={{ ...foundDomain.price, ...{ amount: price } }} period={period} />
          <Flex sx={{ flexDirection: 'column' }}>
            <Text variant="panelHeader" sx={{ mb: 30 }}>
              Current domain will be available from {now} till {till}.
            </Text>
            <Flex sx={{ justifyContent: "center" }}>
              {
                isTransactionPending ?
                  <Flex sx={{ width: "auto", justifyContent: "center", alignItems: "center" }}>
                    <LoadingOverlay />
                  </Flex> :
                  <RegisterAction
                    transactionId={"DOMAIN_REGISTER"}
                    change={foundDomain.isOnSale ? "buyDomain" : "registerDomain"}
                    period={period}
                    domain={foundDomain}
                  >
                    <Plus />
                    register
                  </RegisterAction>
              }

            </Flex>
          </Flex>
        </Box>
      </Container>
    </>
  )
}