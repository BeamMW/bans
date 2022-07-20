import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Container, Flex, Text } from "theme-ui";
import store from "index";
import { Modal } from "@app/components/Modals/Modal";
import { Select } from '@app/components/Select/Select';
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
import Beam from '@app/assets/icons/beam.svg';
import { LoadingOverlay } from "@app/components/LoadingOverlay";

interface SellBansModalProps {
  isShown: boolean;
  closeModal?: (...args) => void;
}

export const SellBansModal: React.FC<SellBansModalProps> = ({ isShown, closeModal }) => {

  if (!isShown) return <></>;

  const { close, data: { domain: domain, domainsToSell: domainsToSell = [] } }:
    { close: any, data: { domain: DomainPresenterType, domainsToSell: Array<DomainPresenterType> } } = useModalContext();

  closeModal = closeModal ?? close;

  const TRANSACTION_ID = "DOMAIN_SELLING";
  const transactionState = useCurrentTransactionState(TRANSACTION_ID);
  const isTransactionPending = IsTransactionPending({ transactionIdPrefix: TRANSACTION_ID });

  const [activeItem, _setActiveItem] = React.useState<DomainPresenterType>(domain);
  const [amount, setAmount] = useState<number | string | null>("");

  const setActiveItem = (item) => {
    !!item && _setActiveItem(item.domain);
  }

  const domainsSelect: any = domainsToSell.map((domain, i) => new Object({
    id: i,
    name: domain.name,
    domain: domain,
  }));

  const handleChange = (e) => setAmount(e.target.value);

  useEffect(() => {
    if (transactionState.id === TRANSACTION_ID && transactionState.type === "completed") {

      closeModal(null);

      return () => {
        store.dispatch(reloadAllUserInfo.request());
      }
    }

  }, [transactionState]);

  const beamPrice = useSelector(selectRate());

  return (
    <Modal isShown={isShown} header="Sell Bans" subHeader="If you want to put a BANS on sale, fill in the Amount only. The Amount can be change at any time. 
    To sell a BANS to a particular user, you need to fill Buyer's Public Key.">
      <Container sx={{ width: 630, padding: '40px 65px' }}>
        {
          activeItem.isOnSale ? <Flex sx={{ mb: 20, textAlign: "center", alignContent: "center" }}>
            <Text>{`Already on sale for ${activeItem.price.amount}!`}</Text>
          </Flex> : <></>
        }

        <Select items={domainsSelect} setActiveItem={setActiveItem} activeItem={activeItem} />

        <Box sx={{ mt: '30px' }}>
          <Input
            variant='modalInput'
            pallete='white'
            label='Amount'
            onChange={handleChange}
            value={amount}
            type="number"
            info={`${beamPrice.mul(Decimal.from(!!amount ? amount : 0).toString()).prettify(2)} USD`}
          >
            <Beam />
          </Input>
        </Box>
        <Box sx={{ my: '30px' }}>
        </Box>
        <Flex sx={{ justifyContent: 'center' }}>
          <Box sx={{ mr: '30px' }}>
            <CloseBtn toggle={closeModal} />
          </Box>
          {
            isTransactionPending ?
              <Flex sx={{ width: "auto", justifyContent: "center", alignItems: "center" }}>
                <LoadingOverlay />
              </Flex> :
              <SellBansAction
                transactionId={TRANSACTION_ID}
                change={"sellBans"}
                amount={+amount}
                domain={activeItem}
                disabled={!amount || activeItem.isOnSale}
              >
                <Sell />
                <Text sx={{ ml: '9px', fontWeight: 'bold', color: '#032E49' }}>Sell</Text>
              </SellBansAction>
          }

        </Flex>
      </Container>
    </Modal>
  )
}