import React, { useEffect } from "react";
import { Box, Text } from "theme-ui";
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
import CheckedIcon from '@app/assets/icons/checked.svg';
import { AssetSelector } from '@app/components/AssetSelector';
import { useWalletAssetsForSelector } from '@app/hooks/useWalletAssetsForSelector';
import { getTextWidth } from "@app/library/base/appUtils";
import { amountHandler, formatAmountInputDisplay, keyPressAmountHandler } from "@app/utils/amountHandler";
import { useSearchValidator } from "@app/hooks/useSearchValidator";

interface SendFundsProps {
  isShown: boolean;
  closeModal?: (...args) => void;
}

const initialValues = {
  domain: '',
  amount: '',
  aid: 0
}

const TRANSACTION_ID = "SEND_FUNDS";

export const SendFunds: React.FC<SendFundsProps> = ({ isShown, closeModal }) => {
  const walletAssets = useWalletAssetsForSelector(isShown);

  const modalCtx = useModalContext();
  const close = modalCtx?.close;
  const passedDomain = modalCtx?.data?.domain as DomainPresenterType | undefined;
  const suggestedDomains = modalCtx?.data?.suggestedDomains ?? [];

  const onClose = closeModal ?? close;

  const transactionState = useCurrentTransactionState(TRANSACTION_ID);

  const [values, setValues] = React.useState(initialValues);
  const [domain, setDomain] = React.useState<DomainPresenterType | undefined>(passedDomain);
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(true);
  const [isValid, setIsValid] = React.useState<boolean>(false);
  const [activeItem, setActiveItem] = React.useState(passedDomain?.name ?? '');
  const [textWidth, setTextWidth] = React.useState(0);

  const beamPrice = useSelector(selectRate);

  const fetchedDomain = useFetchDomainAndConvert(values.domain);
  const isSearchValid = useSearchValidator(values.domain);
  const domainErrorMessage = 'BANS does not exist';

  useEffect(() => {
    if (transactionState.id === TRANSACTION_ID && transactionState.type === "waitingForConfirmation") {
      setIsButtonDisabled(true);
      onClose?.(null);
    }
  }, [transactionState, onClose]);

  useEffect(() => {
    if (!isSearchValid) {
      setIsValid(false);
      setDomain(undefined);
      return;
    }

    const d = fetchedDomain;
    if (!d) {
      setIsValid(false);
      return;
    }
    setIsValid(!d.isAvailable);
    setDomain(d);
  }, [fetchedDomain, isSearchValid]);

  useEffect(() => {
    setIsButtonDisabled(!(isValid && !!values.amount));
  }, [isValid, values.amount]);

  useEffect(() => {
    if (passedDomain?.name) {
      setActiveItem(passedDomain.name);
      setValues((prev) => ({ ...prev, domain: passedDomain.name }));
      setDomain(passedDomain);
    }
  }, [passedDomain]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    if (name === 'domain') {
      !!value && setTextWidth(getTextWidth(value, '16px Arial'));
      setValues({
        ...values,
        [name]: value.toLowerCase(),
      });
    }

    if (name === 'amount') {
      amountHandler(value, (canonical) => setValues((prev) => ({
        ...prev,
        [name]: canonical,
      })))
    }
    return;
  }

  if (!isShown) {
    return null;
  }

  return (
    <Modal isShown={isShown} header="Send funds to the BANS" subHeader="To send assets you need to choose recipient BANS' from favorites or input BANS' domain">
      <>
        {suggestedDomains && suggestedDomains.length ?
          <SelectWithInput items={suggestedDomains} setActiveItem={setActiveItem} activeItem={activeItem} /> :
          <Input
            variant='modalInput'
            pallete='white'
            label='Domain*'
            name='domain'
            onChange={handleChange}
            maxLength={30}
            value={values.domain}
            valid={isValid || values.domain.length === 0}
            errorMessage={domainErrorMessage}
            suffix={values.domain.length ? <Text id="suffix" sx={{
              left: textWidth === 0 ? '0px' : `${textWidth}px`,
              color: isValid ? ' rgba(255,255,255,0.5)' : 'rgba(255, 98, 92, 0.5)',
              fontWeight: 700,
            }}>.beam</Text> : <></>}
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
            onKeyPress={keyPressAmountHandler}
            value={formatAmountInputDisplay(values.amount)}
            type="text"
            info={`${beamPrice.mul(Decimal.from(values.amount ? values.amount : "0").toString()).prettify(2)} USD`}
          >
            <AssetSelector
              value={values.aid}
              onChange={(aid) => setValues({ ...values, aid })}
              assets={walletAssets}
            />
          </Input>
        </Box>
        <ButtonContainer>
          <CloseBtn toggle={onClose} />
          <SendFundsAction
            transactionId={TRANSACTION_ID}
            change={"sendFunds"}
            domain={domain}
            amount={values.amount ? Number(values.amount) : 0}
            aid={typeof values.aid === 'number' ? values.aid : parseInt(String(values.aid), 10) || 0}
            disabled={isButtonDisabled}
          >
            <SendIcon />
            <Text sx={{ fontWeight: 'bold', color: '#032E49', marginLeft: '9px' }}>send</Text>
          </SendFundsAction>
        </ButtonContainer>
      </>
    </Modal>
  )
}
