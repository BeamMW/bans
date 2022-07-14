import React, { useEffect, useMemo } from "react";
import Input from "@app/components/Input";
import { Modal } from "@app/components/Modals/Modal";
import { ButtonContainer } from "@app/components/ButtonsContainer/ButtonContainer";
import { CloseBtn } from "@app/components/CloseBtn/CloseBtn";
import SendIcon from '@app/assets/icons/send.svg';
import BeamIcon from '@app/assets/icons/beam.svg';
import CheckedIcon from '@app/assets/icons/checked.svg';
import { useCurrentTransactionState } from "@app/library/transaction-react/useCurrentTransactionState";
import { IsTransactionPending } from "@app/library/transaction-react/IsTransactionStatus";
import { useSelector } from "react-redux";
import { selectRate } from "@app/store/BansStore/selectors";
import { Decimal } from "@app/library/base/Decimal";
import { SendFundsAction } from "@app/views/Actions/SendFundsAction";
import { DomainPresenterType } from "@app/library/bans/DomainPresenter";
import { useModalContext } from "@app/contexts/Modal/ModalContext";
import { useFetchDomainAndConvert } from "@app/hooks/useFetchDomainAndConvert";
import { LoadingOverlay } from "@app/components/LoadingOverlay";
import { Box, Flex, Text } from "theme-ui";
import { SelectWithInput } from '@app/components/Select/SelectWithInput';

interface SendFundsProps {
  isShown: boolean;
  closeModal?: (...args) => void;
}

const initialValues = {
  domain: '',
  amount: null
}

export const SendFunds: React.FC<SendFundsProps> = ({ isShown, closeModal }) => {

  if (!isShown) return <></>;

  const { close }: { close: any } = useModalContext();

  //if domain exists
  const { data: { domain: passedDomain, suggestedDomains = [] } } = useModalContext() ?? { data: { domain: null, suggestedDomains: [] } };

  closeModal = closeModal ?? close;

  const TRANSACTION_ID = "SEND_FUNDS";

  const transactionState = useCurrentTransactionState(TRANSACTION_ID);
  const isTransactionPending = IsTransactionPending({ transactionIdPrefix: TRANSACTION_ID });

  useEffect(() => {
    if (transactionState.id === TRANSACTION_ID && transactionState.type === "completed") {

      closeModal(null);

      return () => {
        //store.dispatch()
      }
    }

  }, [transactionState]);

  const [values, setValues] = React.useState(initialValues);
  const [domain, setDomain] = React.useState<DomainPresenterType>(passedDomain);
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(true);
  const [isValid, setIsValid] = React.useState<boolean>(false);
  const [activeItem, setActiveItem] = React.useState(domain?.name ?? '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  }

  const beamPrice = useSelector(selectRate());

  useFetchDomainAndConvert(values.domain).then(domain => {
    setIsValid(domain && !domain.isAvailable && !domain.isYourOwn);
    setIsButtonDisabled(isValid && values.amount ? false : true);
    setDomain(domain);
  });

  //first loading!
  useEffect(() => {
    domain && setValues({
      ...values,
      ["domain"]: domain.name,
    });
  }, [])

  return (
    <Modal isShown={isShown} header="Send funds to the BANS">
      <>
        {isTransactionPending && <LoadingOverlay />}
        {suggestedDomains && suggestedDomains.length ?
          <SelectWithInput items={suggestedDomains} setActiveItem={setActiveItem} activeItem={activeItem} /> :
          <Input
            variant='modalInput'
            pallete='white'
            label='Domain*'
            name='domain'
            onChange={handleChange}
            value={values.domain}
          >
            {isValid ? <CheckedIcon /> : <></>}
          </Input>}
        <Box sx={{ mt: '30px' }}>
          <Input
            variant='modalInput'
            pallete='purple'
            label='Amount*'
            name='amount'
            onChange={handleChange}
            value={values.amount}
            type="number"
            info={`${beamPrice.mul(Decimal.from(!!values.amount ? values.amount : 0).toString()).prettify(2)} USD`}
          >
            <Flex sx={{ justifyContent: 'center' }}>
              <BeamIcon /> <Text sx={{ marginLeft: '10px', marginTop: '1px' }}>BEAM</Text>
            </Flex>
          </Input>
        </Box>
        <ButtonContainer>
          <CloseBtn toggle={closeModal} text="cancel" />
          <SendFundsAction
            transactionId={TRANSACTION_ID}
            change={"sendFunds"}
            domain={domain}
            amount={values.amount}
            disabled={isButtonDisabled}
          >
            <SendIcon />
            Send
          </SendFundsAction>
        </ButtonContainer>
      </>
    </Modal>
  )
}