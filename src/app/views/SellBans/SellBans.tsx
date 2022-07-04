import React, { useEffect, useState } from "react";
import { Box, Container, Flex, Text } from "theme-ui";
import { Modal } from "@app/components/Modals/Modal";
import { Select } from '@app/components/Select/Select';
import Input from "@app/components/Input";
import Beam from '@app/assets/icons/beam.svg';
import { CloseBtn } from "@app/components/CloseBtn/CloseBtn";
import { SellBtn } from './../../components/SellBtn/SellBtn';
import { DomainPresenter, DomainPresenterType } from "@app/library/bans/DomainPresenter";
import { SellBansAction } from "./SellBansAction";
import Sell from '../../assets/icons/send.svg';
import { useCurrentTransactionState } from "@app/library/transaction-react/useCurrentTransactionState";
import { IsTransactionPending } from "@app/library/transaction-react/IsTransactionStatus";
import { Decimal } from "@app/library/base/Decimal";
import { useSelector } from "react-redux";
import { selectRate } from "@app/store/BansStore/selectors";

interface SellBansModalProps {
  isShown: boolean;
  toggle: () => void;
  domains: Array<DomainPresenterType>,
  domain: DomainPresenterType
}

export const SellBansModal: React.FC<SellBansModalProps> = ({ isShown, toggle, domains, domain: passedDomain }) => {
  const TRANSACTION_ID = "DOMAIN_SELLING";
  const transactionState = useCurrentTransactionState(TRANSACTION_ID);
  const isTransactionPending = IsTransactionPending({ transactionIdPrefix: TRANSACTION_ID });

  const [activeItem, setActiveItem] = React.useState('');
  const [amount, setAmount] = useState<number | string | null>("");
  const [selectedDomain, setSelectedDomain] = useState<DomainPresenterType>(passedDomain);

  const domainsSelect: any = domains.map((domain, i) => new Object({
    id: i,
    name: domain.name
  }));

  /*   setActiveItem(
      domainsSelect.filter(domainSelect => domain.name == domainSelect.name).pop().id
    )
   */

  const handleChange = (e) => setAmount(e.target.value);

  useEffect(() => {
    if (transactionState.id === TRANSACTION_ID && transactionState.type === "completed") {
      toggle();
      return () => {
        //store.dispatch()
      }
    }

  }, [transactionState]);


  const beamPrice = useSelector(selectRate());


  return (
    <Modal isShown={isShown} header="Sell Bans">
      <Container sx={{ width: 630, padding: '40px 65px' }}>
        {
          selectedDomain.isOnSale ? <Flex sx={{ mb: 20, textAlign: "center", alignContent: "center" }}>
            <Text>{`ALREADY ON SALE for ${selectedDomain.price.amount}!`}</Text>
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
            info={`${beamPrice.mul(Decimal.from(!!amount ? amount : 0).toString()).prettify(2)} USD`}
          >
            <Beam />
          </Input>
        </Box>
        <Box sx={{ my: '30px' }}>
          {/* <Input
          variant='sell'
          pallete='white'
          label="Buyer's Public Key"
          /> */}
        </Box>
        <Flex sx={{ justifyContent: 'center' }}>
          <Box sx={{ mr: '30px' }}>
            <CloseBtn toggle={toggle} />
          </Box>
          <SellBansAction
            transactionId={TRANSACTION_ID}
            change={"sellBans"}
            amount={+amount}
            domain={selectedDomain}
          >
            <Sell />
            <Text sx={{ ml: '9px', fontWeight: 'bold', color: '#032E49' }}>Sell</Text>
          </SellBansAction>
        </Flex>
      </Container>
    </Modal>
  )
}