import React, { useEffect, useMemo } from "react";
import { Box, Flex, Text } from "theme-ui";
import Input from "@app/components/Input";
import { Modal } from "@app/components/Modals/Modal";
import { ButtonContainer } from "@app/components/ButtonsContainer/ButtonContainer";
import { CloseBtn } from "@app/components/CloseBtn/CloseBtn";
import { useCurrentTransactionState } from "@app/library/transaction-react/useCurrentTransactionState";
import { useSelector } from "react-redux";
import { selectRate } from "@app/store/BansStore/selectors";
import { Decimal } from "@app/library/base/Decimal";
import { SendFundsAction } from "@app/views/Actions/SendFundsAction";
import { DomainPresenterType } from "@app/library/bans/DomainPresenter";
import { useModalContext } from "@app/contexts/Modal/ModalContext";
import { useFetchDomainAndConvert } from "@app/hooks/useFetchDomainAndConvert";
import { SelectWithInput } from '@app/components/Select/SelectWithInput';
import SendIcon from '@app/assets/icons/send.svg';
import BeamIcon from '@app/assets/icons/beam.svg';
import CheckedIcon from '@app/assets/icons/checked.svg';
import _ from "lodash";
import { measureText, getTextWidth } from "@app/library/base/appUtils";
import { amountHandler, keyPressAmountHandler } from "@app/utils/amountHandler";

interface SendFundsProps {
  isShown: boolean;
  closeModal?: (...args) => void;
}

const initialValues = {
  domain: '',
  amount: ''
}

export const SendFunds: React.FC<SendFundsProps> = ({ isShown, closeModal }) => {

  if (!isShown) return <></>;

  const { close }: { close: any } = useModalContext();

  //if domain exists
  const { data: { domain: passedDomain, suggestedDomains = [] } } = useModalContext() ?? { data: { domain: null, suggestedDomains: [] } };

  closeModal = closeModal ?? close;

  const TRANSACTION_ID = "SEND_FUNDS";

  const transactionState = useCurrentTransactionState(TRANSACTION_ID);

  useEffect(() => {
    if (transactionState.id === TRANSACTION_ID && transactionState.type === "waitingForConfirmation") {
      closeModal(null);
    }

    if (transactionState.id === TRANSACTION_ID && transactionState.type === "completed") {
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
  const [textWidth, setTextWidth] = React.useState(0);
  const [isValidAmount, setIsValidAmount] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let regexForDomain = /^[A-Za-z0-9]*$/;

    if (name === 'domain') {
      if (regexForDomain.test(value)) {
        !!value && setTextWidth(getTextWidth(value, '16px Arial'/* 16 */));

        setValues({
          ...values,
          [name]: value.toLowerCase(),
        });
      }
    }

    if (name === 'amount') {
      amountHandler(value, (value) => setValues({
        ...values,
        [name]: value,
      }))
    }
    return;
  }

  const beamPrice = useSelector(selectRate());

  useFetchDomainAndConvert(values.domain).then(domain => {
    setIsValid(domain && !domain.isAvailable && !domain.isYourOwn);
    setIsButtonDisabled(isValid && values.amount ? false : true);
    setDomain(domain);
  });

  function updateSuffix(e: React.KeyboardEvent<HTMLInputElement>) {

    /* if (e.key == 'l' || e.key == 'i') {
      setTextWidth(textWidth - 4);
    } else if (e.key == 'm' || e.key == 'w') {
      setTextWidth(textWidth + 5);
    } else {
      setTextWidth(textWidth);
    } */

    /* if (e.key === "Backspace" && values.domain.length !== 0) {
      setTextWidth(textWidth - 12);
      return;
    }
    if (e.key === "Backspace" && values.domain.length === 0) return; */

  }


  //first loading!
  useEffect(() => {
    domain && setValues({
      ...values,
      ["domain"]: domain.name,
    });
  }, [])

  return (
    <Modal isShown={isShown} header="Send funds to the BANS" subHeader="To send assets you need to choose recipient Bans' from favorites or input Bans domain">
      <>
        {suggestedDomains && suggestedDomains.length ?
          <SelectWithInput items={suggestedDomains} setActiveItem={setActiveItem} activeItem={activeItem} /> :
          <Input
            variant='modalInput'
            pallete='white'
            label='Domain*'
            name='domain'
            onChange={handleChange}
            //onKeyDown={updateSuffix}
            value={values.domain}
            maxLength={30}
            valid={isValid || values.domain.length === 0}
            errorMessage={'Incorrect domain'}
            suffix={values.domain.length ? <Text id="suffix" sx={{
              left: textWidth === 0 ? '0px' : `${textWidth}px`,
              color: isValid ? ' rgba(255,255,255,0.5)' : 'rgba(255, 98, 92, 0.5)'
            }}>.beam</Text> : <></>}
          >
            {isValid ? <CheckedIcon /> : <></>}
          </Input>}
          {textWidth}

        <Box sx={{ mt: '30px' }}>
          <Input
            variant='modalInput'
            pallete='purple'
            label='Amount*'
            name='amount'
            onChange={handleChange}
            onKeyPress={keyPressAmountHandler}
            value={values.amount}
            type="text"
            info={`${beamPrice.mul(Decimal.from(!!values.amount ? values.amount : 0).toString()).prettify(2)} USD`}
          >
            <Flex sx={{ justifyContent: 'center' }}>
              <BeamIcon /> <Text sx={{ marginLeft: '10px', marginTop: '1px' }}>BEAM</Text>
            </Flex>
          </Input>
        </Box>
        <ButtonContainer>
          <CloseBtn toggle={closeModal} />
          <SendFundsAction
            transactionId={TRANSACTION_ID}
            change={"sendFunds"}
            domain={domain}
            amount={!!values.amount ? +values.amount : 0}
            disabled={isButtonDisabled}
          >
            <SendIcon />
            send
          </SendFundsAction>
        </ButtonContainer>
      </>
    </Modal>
  )
}