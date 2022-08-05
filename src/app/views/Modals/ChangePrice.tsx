import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Flex, Text } from "theme-ui";
import store from "index";
import { ButtonContainer } from "@app/components/ButtonsContainer/ButtonContainer";
import { CloseBtn } from "@app/components/CloseBtn/CloseBtn";
import { Modal } from "@app/components/Modals/Modal";
import { Amount } from "@app/components/Amount/Amount";
import Input from "@app/components/Input";
import { DomainPresenterType } from "@app/library/bans/DomainPresenter";
import { useCurrentTransactionState } from "@app/library/transaction-react/useCurrentTransactionState";
import { IsTransactionPending } from "@app/library/transaction-react/IsTransactionStatus";
import { SellBansAction } from "@app/views/Actions/SellBansAction";
import { GROTHS_IN_BEAM } from "@app/constants";
import { Decimal } from "@app/library/base/Decimal";
import { selectRate } from "@app/store/BansStore/selectors";
import { useModalContext } from "@app/contexts/Modal/ModalContext";
import { reloadAllUserInfo } from "@app/store/BansStore/actions";
import BeamIcon from '@app/assets/icons/beam.svg';
import ArrowRightBlack from '@app/assets/icons/arrow-right-black.svg'
import _ from "lodash";
import { amountHandler, keyPressAmountHandler } from "@app/utils/amountHandler";
import { ShaderTransactionComments } from "@app/library/bans/types";


interface ChangePriceProps {
  isShown: boolean;
  closeModal?: (...args) => void;
}

export const ChangePrice: React.FC<ChangePriceProps> = ({ isShown, closeModal }) => {
  if (!isShown) return <></>;

  const { close, data: { domain: domain } }: { close: any, data: { domain: DomainPresenterType } } = useModalContext();

  closeModal = closeModal ?? close;

  const TRANSACTION_ID = `${ShaderTransactionComments.setDomainPrice} for ${domain.beautyName}`;
  const transactionState = useCurrentTransactionState(TRANSACTION_ID);
  const isTransactionPending = IsTransactionPending({ transactionIdPrefix: TRANSACTION_ID });

  useEffect(() => {
    if (transactionState.id === TRANSACTION_ID && transactionState.type === "waitingForApproval") {
      closeModal(null);
    }

    if (transactionState.id === TRANSACTION_ID && transactionState.type === "completed") {
      store.dispatch(reloadAllUserInfo.request());

      return () => { }
    }

  }, [transactionState]);

  const [amount, setAmount] = useState(+(domain.price.amount / GROTHS_IN_BEAM));

  const handlePriceChange = (e) => {
    const { value } = e.target;

    amountHandler(value, (value) => setAmount(value))
  }
  const header = `Change price for ${domain.name}.beam domain`;
  const beamPrice = useSelector(selectRate());

  return (
    <Modal isShown={isShown} header={header} width={'450px'}>
      <>
        <Box sx={{ mb: '10px' }}>
          <Text variant="subHeader">Current price</Text>
        </Box>
        <Box>
          <Amount value={Decimal.from(domain.price.amount / GROTHS_IN_BEAM).toString(0)} size="14px" showConvertedToUsd={true} />
        </Box>
        <Box sx={{ mt: '30px' }}>
          <Input
            variant='modalInput'
            pallete='blue'
            label='New price'
            onChange={handlePriceChange}
            onKeyPress={keyPressAmountHandler}
            value={amount}
            info={`${beamPrice.mul(Decimal.from(!!amount ? amount : 0).toString()).prettify(2)} USD`}
          >
            <Flex sx={{ justifyContent: 'center' }}>
              <BeamIcon /> <Text sx={{ marginLeft: '10px', marginTop: '1px' }}>BEAM</Text>
            </Flex>
          </Input>
        </Box>
        <ButtonContainer>
          <CloseBtn toggle={closeModal} text='cancel' />
          <SellBansAction
            transactionId={TRANSACTION_ID}
            change={"adjustSellingBans"}
            amount={+amount}
            domain={domain}
            disabled={Decimal.from(+amount).isZero  || isTransactionPending}
          >
            <ArrowRightBlack style={{ marginRight: '9px' }}/>
            change
          </SellBansAction>
        </ButtonContainer>
      </>
    </Modal>
  )
}