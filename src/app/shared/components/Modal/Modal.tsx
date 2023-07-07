import React, { FC } from 'react';
import ReactDOM from 'react-dom';

import { ButtonContainer } from '@app/shared/components/Modal/ButtonContainer';
import { Button } from '@app/shared/components';
import { IconRemove, IconSendBlack } from '@app/shared/icons';
import {
  Wrapper,
  ModalContent,
  ModalHeader,
  SubHeader, Box,
} from './modal.style';

export interface ModalProps {
  isShown: boolean;
  children: JSX.Element;
  header?: string;
  subHeader?: string;
  width?: string;
  onClose?: () => void;
  actionButton?: () => void;
  labelAction?: string
}

export const Modal: FC<ModalProps> = ({
  isShown,
  onClose,
  header,
  subHeader,
  width,
  children,
  actionButton,
  labelAction,
}) => {
  const modal = (
    <Wrapper>
      <ModalContent width={width}>
        <Box>
          {
                            header && (
                            <ModalHeader>
                              { header }
                            </ModalHeader>
                            )
}
          {
                            subHeader && (
                            <SubHeader>
                              {subHeader}
                            </SubHeader>
                            )
                        }
        </Box>
        { children }
        <ButtonContainer>
          <Button variant="ghost" icon={IconRemove} onClick={onClose}>close</Button>
          <Button icon={IconSendBlack} onClick={actionButton}>{labelAction || 'action'}</Button>
        </ButtonContainer>
      </ModalContent>
    </Wrapper>
  );

  return isShown ? ReactDOM.createPortal(modal, document.body) : null;
};
