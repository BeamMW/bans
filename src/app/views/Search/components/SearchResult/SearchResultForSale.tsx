import React, { useEffect } from 'react';
import Button from '@app/components/Button';
import { Modal } from '@app/components/Modals/Modal';
import ArrowRight from '../../../../assets/icons/arrow-right.svg'

import { ButtonContainer } from '@app/components/ButtonsContainer/ButtonContainer';
import { CloseBtn } from '@app/components/CloseBtn/CloseBtn';
import { Box, Paragraph } from 'theme-ui';

interface ResultForSaleProps {
  isShown: boolean;
  toggleClose: () => void;
}
export const SearchResultForSale : React.FC<ResultForSaleProps > = ({ isShown, toggleClose }) => {

  return (
    <Modal isShown={isShown} header="Attention">
      <>
        <Box>
          <Paragraph sx={{ textAlign: 'center' }}>You are going to buy a BANS with the set expiration period - August 29, 2022. </Paragraph>
          <Paragraph sx={{ textAlign: 'center' }}>You will need to renew your subscription before the expiring date.</Paragraph>
        </Box>

        <ButtonContainer>
          <CloseBtn toggle={toggleClose} text="cancel"/>
          <Button pallete="green" onClick={() => {}}>
            <ArrowRight />
            continue
          </Button>
        </ButtonContainer>
      </>
    </Modal>
  )
}