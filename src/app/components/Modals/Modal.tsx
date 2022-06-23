import React, { FC } from 'react';
import ReactDOM from 'react-dom';

import {
  Wrapper,
  ModalContent,
  ModalHeader
} from './modal.style';

export interface ModalProps {
  isShown: boolean;
  children: JSX.Element;
  header?: string;
}

export const Modal: FC<ModalProps> = ({
  isShown,
  header,
  children
}) => {
  const modal = (
    <React.Fragment>
      <Wrapper>
        <ModalContent>
        {
          header && (
            <ModalHeader>
              { header }
            </ModalHeader>
        )} 
          { children }
        </ModalContent>
      </Wrapper>
    </React.Fragment>
  );

  return isShown ? ReactDOM.createPortal(modal, document.body) : null;
};
