import React from 'react';
import { Modal } from '@app/shared/components/Modal';
import { Registration } from '@app/shared/components/index';
import { IDomains } from '@app/shared/interface';

interface RenewModalProps {
  isShown: boolean;
  onClose: () => void;
  domain: IDomains ;
}

function RenewModal({ isShown, onClose, domain }:RenewModalProps) {
  if (!isShown) return <></>;
  return (
    <Modal isShown={isShown} onClose={onClose} header="Renew subscription" isFooter={false}>
      <Registration domain={domain} isRenew onClose={onClose} />
    </Modal>
  );
}

export default RenewModal;
