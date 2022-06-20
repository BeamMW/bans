import React, { FC } from 'react';
import ReactDOM from 'react-dom';

import {
  Wrapper,
  ModalContent,
} from './modal.style';

export interface ModalProps {
  isShown: boolean;
  children: JSX.Element;
}

export const Modal: FC<ModalProps> = ({
  isShown,
  children
}) => {
  const modal = (
    <React.Fragment>
      <Wrapper>
        <ModalContent>
          { children }
        </ModalContent>
      </Wrapper>
    </React.Fragment>
  );

  return isShown ? ReactDOM.createPortal(modal, document.body) : null;
};
