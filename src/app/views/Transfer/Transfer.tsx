import React from 'react';
import Button from '@app/components/Button';
import { Modal } from '@app/components/Modals/Modal';
import ArrowRight from '../../assets/icons/arrow-right.svg'

import { ButtonContainer } from '@app/components/ButtonsContainer/ButtonContainer';
import { CloseBtn } from '@app/components/CloseBtn/CloseBtn';
import { Box, Paragraph } from 'theme-ui';
import Input from '@app/components/Input';

interface TranferProps {
  isShown: boolean;
  toggleClose: () => void;
}
export const Transfer: React.FC<TranferProps> = ({ isShown, toggleClose }) => {
  return (
    <Modal isShown={isShown} header="Transfer">
      <>
      <Box>
        <Paragraph sx={{textAlign: 'center'}}>Paste the wallet address where you want to transfer this domain</Paragraph>
        </Box>
        <Box sx={{mt:'20px', my: '30px'}}>
        <Input
          variant='proposal'
          pallete='white'
          onChange={() => {}}
          value='key'
          maxLength={30}
        />
      </Box>
      <ButtonContainer>
          <CloseBtn toggle={toggleClose}/>
      <Button pallete="green" onClick={() => {}} style={{ fontSize: '14px' }}>
            <ArrowRight />
            Transfer
      </Button>
      </ButtonContainer>
      </>
    </Modal>
  )
}