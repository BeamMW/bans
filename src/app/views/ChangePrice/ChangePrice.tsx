import React, { useEffect } from "react";
import { Box, Text } from "theme-ui";
import Button from "@app/components/Button";
import { ButtonContainer } from "@app/components/ButtonsContainer/ButtonContainer";
import { CloseBtn } from "@app/components/CloseBtn/CloseBtn";
import { Modal } from "@app/components/Modals/Modal";
import ArrowRight from '../../assets/icons/arrow-right.svg'
import { Amount } from "@app/components/Amount/Amount";
import Input from "@app/components/Input";
import { DomainPresenterType } from "@app/library/bans/DomainPresenter";
import { useCurrentTransactionState } from "@app/library/transaction-react/useCurrentTransactionState";
import { IsTransactionPending } from "@app/library/transaction-react/IsTransactionStatus";
import { LoadingOverlay } from "@app/components/LoadingOverlay";
import { SellBansAction } from "../SellBans/SellBansAction";
import { GROTHS_IN_BEAM } from "@app/constants";
import { Decimal } from "@app/library/base/Decimal";
import { useSelector } from "react-redux";
import { selectRate } from "@app/store/BansStore/selectors";


interface ChangePriceProps {
  isShown: boolean;
  toggleClose: () => void;
  domain: DomainPresenterType;
}

export const ChangePrice: React.FC<ChangePriceProps> = ({ isShown, toggleClose, domain }) => {
  const TRANSACTION_ID = "DOMAIN_ADJUSTE_SALE";
  const transactionState = useCurrentTransactionState(TRANSACTION_ID);
  const isTransactionPending = IsTransactionPending({ transactionIdPrefix: TRANSACTION_ID });

  useEffect(() => {
    if (transactionState.id === TRANSACTION_ID && transactionState.type === "completed") {
      toggleClose();
      return () => {
        //store.dispatch()
      }
    }

  }, [transactionState]);

  const [amount, setAmount] = React.useState(domain.price.amount / GROTHS_IN_BEAM);

  const handlePriceChange = (e) => {
    setAmount(e.target.value)
  }
  const header = `Change price for ${domain.name}.beam domain`;
  const beamPrice = useSelector(selectRate());

  return (
    <Modal isShown={isShown} header={header} width={'390px'}>
      <>
        {isTransactionPending && <LoadingOverlay />}
        <Box sx={{ mb: '10px' }}>
          <Text variant="subHeader">Current price</Text>
        </Box>
        <Box>
          <Amount value={Decimal.from(domain.price.amount / GROTHS_IN_BEAM).toString(0)} size="14px" showConvertedToUsd={true} />
        </Box>
        <Box sx={{ mt: '30px' }}>
          <Input
            variant='sell'
            pallete='blue'
            label='New price'
            onChange={handlePriceChange}
            value={amount}
            info={`${beamPrice.mul(Decimal.from(!!amount ? amount : 0).toString()).prettify(2)} USD`}
          >
          </Input>
        </Box>
        <ButtonContainer>
          <CloseBtn toggle={toggleClose} />
          <SellBansAction
            transactionId={TRANSACTION_ID}
            change={"adjustSellingBans"}
            amount={+amount}
            domain={domain}
          >
            <ArrowRight />
            Transfer
          </SellBansAction>
        </ButtonContainer>
      </>
    </Modal>
  )
}