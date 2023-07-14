import React, { useState } from 'react';
import { Modal } from '@app/shared/components/Modal';
import { IDomains } from '@app/shared/interface';
import { Input } from '@app/shared/components/index';
import { transferDomain } from '@core/api';
import { IconTransferBlack } from '@app/shared/icons';

interface TransferModalProps {
  isShown: boolean;
  onClose: () => void;
  domain: string
}
const TransferModal: React.FC<TransferModalProps> = ({ isShown, onClose, domain }) => {
  const [values, setValues] = useState<string>('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValues(value);
  };

  const onSend = () => {
    transferDomain({
      pkey: values,
      domain,
    });
  };
  return (
    <Modal isShown={isShown} onClose={onClose} header="Transfer" subHeader="Paste the Publisher key of the recipient of this domain" actionButton={onSend} labelAction="transfer" icon={IconTransferBlack}>
      <Input
        variant="modalInput"
        pallete="white"
        name="amount"
        onChange={handleChange}
        value={values}
        type="text"
        maxLength={66}
      />
    </Modal>
  );
};

export default TransferModal;
