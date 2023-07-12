import React from 'react';
import { Modal } from '@app/shared/components/Modal';
import { useSelector } from 'react-redux';
import { selectPublicKey } from '@app/containers/Main/store/selectors';
import { styled } from '@linaria/react';
import { Button } from '@app/shared/components/index';
import { IconCopy, IconCopyBlue } from '@app/shared/icons';
import { copyToClipboard } from '@core/appUtils';
import icon from '*.svg';

export interface PkeyModalProps {
  isShown: boolean;
  onClose: () => void
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Content = styled.div`
  margin-top: 30px;
  display: flex;
  width: 100%;
  justify-content: center;
`;
export const Controls = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: row;

  & > *:not(:first-child) {
  margin-left: 30px;
  }
`;

export const CopyText = styled.span`
  color: #FFF;
  font-family: SFProDisplay, sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-right: 9px;
`;
const PKeyModal:React.FC<PkeyModalProps> = ({ isShown, onClose }) => {
  const publicKey = useSelector(selectPublicKey());
  const handleConfirm: React.MouseEventHandler = async () => {
    await copyToClipboard(publicKey);
    onClose();
  };

  const handleCopy = async () => {
    await copyToClipboard(publicKey);
  };
  return (
    <Modal isShown={isShown} onClose={onClose} header="Public key" actionButton={handleConfirm} labelAction="copy and close" icon={IconCopyBlue}>
      <Content>
        <CopyText>{publicKey}</CopyText>
        <Button variant="icon" pallete="transparent" onClick={handleCopy}>
          <IconCopy />
        </Button>
      </Content>
    </Modal>
  );
};

export default PKeyModal;
