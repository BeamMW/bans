import React, { useEffect, useMemo } from "react";
import Input from "@app/components/Input";
import { Modal } from "@app/components/Modals/Modal";
import { ButtonContainer } from "@app/components/ButtonsContainer/ButtonContainer";
import { CloseBtn } from "@app/components/CloseBtn/CloseBtn";
import Button from "@app/components/Button";
import SendIcon from '@app/assets/icons/send.svg';
import BeamIcon from '@app/assets/icons/beam.svg';
import CheckedIcon from '@app/assets/icons/checked.svg';
import { useCurrentTransactionState } from "@app/library/transaction-react/useCurrentTransactionState";
import { IsTransactionPending } from "@app/library/transaction-react/IsTransactionStatus";
import { useSelector } from "react-redux";
import { selectRate } from "@app/store/BansStore/selectors";
import { Decimal } from "@app/library/base/Decimal";
import { SendFundsAction } from "@app/views/Actions/SendFundsAction";
import { DomainPresenterType, getDomainPresentedData } from "@app/library/bans/DomainPresenter";
import { useModalContext } from "@app/contexts/Modal/ModalContext";
import { useFetchDomainAndConvert } from "@app/hooks/useFetchDomainAndConvert";
import { useSearchValidator } from "@app/hooks/useSearchValidator";
import { useConvertToDomainPresenter } from "@app/hooks/useConvertToDomainPresenter";
import { selectSystemState } from "@app/store/SharedStore/selectors";
import { LoadingOverlay } from "@app/components/LoadingOverlay";
import { Box, Flex, Text } from "theme-ui";

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
  const {data: { domain: passedDomain } = null} = useModalContext() ?? {data: {domain: null}};

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  }

  const beamPrice = useSelector(selectRate());

  useFetchDomainAndConvert(values.domain).then(domain => {
    setIsButtonDisabled(domain && !domain.isAvailable && !domain.isYourOwn && values.amount ? false : true);
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
        <Input
          variant='modalInput'
          pallete='white'
          label='Domain*'
          name='domain'
          onChange={handleChange}
          value={values.domain}
        >
          <CheckedIcon />
        </Input>
        <Box sx={{mt: '30px'}}>
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
          <Flex sx={{justifyContent: 'center'}}>
          <BeamIcon /> <Text sx={{ marginLeft:'10px', marginTop:'1px' }}>BEAM</Text>
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