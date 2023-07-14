import React, { useState } from 'react';
import { Modal } from '@app/shared/components/Modal';
import { useSelector } from 'react-redux';
import { selectPublicKey, selectUserDomains } from '@app/containers/Main/store/selectors';
import { Select } from '@app/shared/components/Select/Select';
import { Input } from '@app/shared/components/index';
import {IconBeam, IconSell, IconSendBlack} from '@app/shared/icons';
import { styled } from '@linaria/react';
import { getTextWidth } from '@core/appUtils';
import { actions } from '@app/containers/Main/store';
import { amountHandler } from '@core/amountHandler';
import { toSellDomain } from '@core/api';

interface SellModalProps {
  isShown?: boolean;
  onClose: ()=>void;
}

const Box = styled.div`
margin-top: 1.875rem;
`;

const Amountlabel = styled.span`
margin-left: 10px;
margin-top: 1px;
`;
const AmountlabelContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

function SellModal({ onClose, isShown }:SellModalProps) {
  const domains = useSelector(selectUserDomains());
  const [activeItem, _setActiveItem] = React.useState(domains[0]);
  const [values, setValues] = useState('');
  const pkey = useSelector(selectPublicKey());
  const domainsSelect: any = domains.map((domain, i) => ({
    ...domain, id: i,
  }));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    amountHandler(value, (val) => setValues(val));
  };

  const onSell = () => {
    toSellDomain({ amount: values, domain: activeItem, pkey });
  };

  return (
    <Modal isShown={isShown} onClose={onClose} header="Sell BANS" subHeader="If you want to put a BANS on sale, fill in the Amount only. The Amount can be change at any time. To sell a BANS to a particular user, you need to fill Buyer's Public Key." actionButton={onSell} labelAction="sell" icon={IconSendBlack}>
      <>
        <Select items={domainsSelect} activeItem={activeItem} setActiveItem={_setActiveItem} showSuffix />
        <Box sx={{ mt: '30px' }}>
          <Input
            variant="modalInput"
            pallete="purple"
            label="Amount*"
            name="amount"
            onChange={handleChange}
            value={values}
            type="text"
            rate={values}
            placeholder="0"
          >
            <AmountlabelContainer>
              <IconBeam />
              {' '}
              <Amountlabel>BEAM</Amountlabel>
            </AmountlabelContainer>
          </Input>
        </Box>
      </>
    </Modal>

  );
}

export default SellModal;
