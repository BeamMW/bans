import React from 'react';
import Button from '@app/components/Button';
import { Modal } from '@app/components/Modals/Modal';
import RemoveIcon from '../../assets/icons/remove-sale.svg'

import { ButtonContainer } from '@app/components/ButtonsContainer/ButtonContainer';
import { CloseBtn } from '@app/components/CloseBtn/CloseBtn';
import { Box, Paragraph } from 'theme-ui';
import Input from '@app/components/Input';

interface RemoveProps {
  isShown: boolean;
  toggleClose: () => void;
}
export const RemoveModal: React.FC<RemoveProps> = ({ isShown, toggleClose }) => {
  return (
    <Modal isShown={isShown} header="Remove from sale">
      <>
      <Box>
        <Paragraph sx={{textAlign: 'center'}}>Are you sure you want to remove domain batboy.beam from sale?</Paragraph>
        </Box>

      <ButtonContainer>
          <CloseBtn toggle={toggleClose}/>
      <Button pallete='vote-red' onClick={() => {}} style={{ fontSize: '14px' }}>
            <RemoveIcon />
             remove
      </Button>
      </ButtonContainer>
      </>
    </Modal>
  )
}