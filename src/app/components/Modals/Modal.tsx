import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import { Box } from 'theme-ui';

import {
  Wrapper,
  ModalContent,
  ModalHeader,
  SubHeader
} from './modal.style';

export interface ModalProps {
  isShown: boolean;
  children: JSX.Element;
  header?: string;
  subHeader?: string;
  width?: string;
}

export const Modal: FC<ModalProps> = ({
  isShown,
  header,
  subHeader,
  width,
  children
}) => {
  const modal = (
    <React.Fragment>
      <Wrapper>
        <ModalContent width={width}>
        <Box sx={{marginBottom: '30px'}}>
        {
          header && (
            <ModalHeader>
              { header }
            </ModalHeader>
        )}
        {
          subHeader && (
            <SubHeader>
              {subHeader}
            </SubHeader>
          )
        }
        </Box>
          { children }
        </ModalContent>
      </Wrapper>
    </React.Fragment>
  );

  return isShown ? ReactDOM.createPortal(modal, document.body) : null;
};
