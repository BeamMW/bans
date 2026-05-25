import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Container, Flex, Text } from "theme-ui";
import store from "index";
import { Modal } from "@app/components/Modals/Modal";
import Input from "@app/components/Input";
import { CloseBtn } from "@app/components/CloseBtn/CloseBtn";
import { DomainPresenterType } from "@app/library/bans/DomainPresenter";
import { SellBansAction } from "@app/views/Actions/SellBansAction";
import { useCurrentTransactionState } from "@app/library/transaction-react/useCurrentTransactionState";
import { IsTransactionPending } from "@app/library/transaction-react/IsTransactionStatus";
import { Decimal } from "@app/library/base/Decimal";
import { selectRate } from "@app/store/BansStore/selectors";
import { useModalContext } from "@app/contexts/Modal/ModalContext";
import { reloadAllUserInfo } from "@app/store/BansStore/actions";
import Sell from '@app/assets/icons/send.svg';
import { AssetSelector } from '@app/components/AssetSelector';
import { useWalletAssetsForSelector } from '@app/hooks/useWalletAssetsForSelector';
import { amountHandler, formatAmountInputDisplay, keyPressAmountHandler } from "@app/utils/amountHandler";

const initialValues = {
  amount: "",
  aid: 0
};

interface SellBansModalProps {
  isShown: boolean;
  closeModal?: (...args) => void;
}

export const SellBansModal: React.FC<SellBansModalProps> = ({ isShown, closeModal }) => {
  const walletAssets = useWalletAssetsForSelector(isShown);
  const modalCtx = useModalContext();
  const onClose = closeModal ?? modalCtx.close;
  const data = modalCtx.data as { domain?: DomainPresenterType } | null | undefined;
  const domain = data?.domain;

  const TRANSACTION_ID = "DOMAIN_SELLING";
  const transactionState = useCurrentTransactionState(TRANSACTION_ID);
  const isTransactionPending = IsTransactionPending({ transactionIdPrefix: TRANSACTION_ID });
  const [values, setValues] = useState(initialValues);
  const txState: any = transactionState;

  useEffect(() => {
    if (isShown && domain) {
      setValues({ ...initialValues });
    }
  }, [isShown, domain]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    amountHandler(value, (amount) => setValues((prev) => ({
      ...prev,
      amount,
    })))
  }

  useEffect(() => {
    if (!isShown) return;

    if (txState.id === TRANSACTION_ID && txState.type === "waitingForApproval") {
      onClose(null);
    }

    if (txState.id === TRANSACTION_ID && txState.type === "completed") {

      store.dispatch(reloadAllUserInfo.request());

      return () => {
        setValues(initialValues);
      }
    }

  }, [transactionState, isShown, onClose]);

  const beamPrice = useSelector(selectRate);

  if (!isShown || !domain) {
    return null;
  }

  return (
    <Modal isShown={isShown} header="Sell BANS" subHeader="If you want to put a BANS on sale, fill in the Amount only. The Amount can be change at any time. To sell a BANS to a particular user, you need to fill Buyer's Public Key.">
      <Container sx={{ width: 630, padding: '40px 65px' }}>
        {
          domain.isOnSale ? <Flex sx={{ mb: 20, textAlign: "center", alignContent: "center" }}>
            <Text>{`Already on sale for ${domain.price.amount}!`}</Text>
          </Flex> : <></>
        }

        <Box sx={{ mt: '30px' }}>
          <Input
            variant='modalInput'
            pallete='blue'
            label='Amount'
            onChange={handleChange}
            onKeyPress={keyPressAmountHandler}
            value={formatAmountInputDisplay(values.amount)}
            type="text"
            info={`${beamPrice.mul(Decimal.from(values.amount ? values.amount : "0").toString()).prettify(2)} USD`}
          >
            <AssetSelector
              value={values.aid}
              onChange={(aid) => setValues((prev) => ({ ...prev, aid }))}
              assets={walletAssets}
            />
          </Input>
        </Box>
        <Box sx={{ my: '30px' }}>
        </Box>
        <Flex sx={{ justifyContent: 'center' }}>
          <Box sx={{ mr: '30px' }}>
            <CloseBtn toggle={onClose} />
          </Box>
          {
            <SellBansAction
              transactionId={TRANSACTION_ID}
              change={"sellBans"}
              amount={values.amount ? Number(values.amount) : 0}
              aid={typeof values.aid === 'number' ? values.aid : parseInt(String(values.aid), 10) || 0}
              domain={domain}
              disabled={!values.amount || Decimal.from(values.amount).isZero || domain.isOnSale || isTransactionPending}
              pallete='blue'
            >
              <Sell />
              <Text sx={{ fontWeight: 'bold', color: '#032E49', marginLeft: '9px' }}>sell</Text>
            </SellBansAction>
          }

        </Flex>
      </Container>
    </Modal>
  )
}
