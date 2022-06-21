import React from "react";
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
import { IsTransactionPending } from "@app/library/transaction-react/IsTransactionStatus";
import { LoadingOverlay } from "@app/components/LoadingOverlay";
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

export const Register: React.FC = () => {
  const { search } = useBansView();
  const isTransactionPending = IsTransactionPending({ transactionIdPrefix: "DOMAIN" });

  return (
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
          <YearMinus style={iconStyle} />
          <Text sx={{ mx: '12px' }}>1 year</Text>
          <YearPlus style={iconStyle} />
        </Flex>
        <Flex sx={{ mt: 24, mb: 5 }}>
          <Text variant="panelHeader">
            Registration price
          </Text>
          <Amount value='TBD' size="14px" showConvertedToUsd={true}/>
        </Flex>
        <Flex sx={{ flexDirection: 'column' }}>
          <Text variant="panelHeader">
            Current domain will be available from TBD till TBD.
          </Text>
          <RegisterAction
            transactionId={"DOMAIN_REGISTER"}
            change={"registerDomain"}
          >
            <Plus />
            register
          </RegisterAction>
        </Flex>
      </Box>
      {isTransactionPending && <LoadingOverlay />}
    </Container>
  )
}