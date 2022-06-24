import React from "react";
import { Box, Container, Flex } from "theme-ui";
import { Modal } from "@app/components/Modals/Modal";
import { Select } from '@app/components/Select/Select';
import Input from "@app/components/Input";
import Beam from '../../assets/icons/beam.svg';
import { CloseBtn } from "@app/components/CloseBtn/CloseBtn";
import { SellBtn } from './../../components/SellBtn/SellBtn';
interface SellBansModalProps {
  isShown: boolean;
  toggle: () => void;
}

export const SellBansModal: React.FC<SellBansModalProps> = ({ isShown, toggle }) => {
  return (
    <Modal isShown={isShown} header="Sell Bans">
      <Container sx={{ width: 630, padding: '40px 65px' }}>
        <Input
          variant='sell'
          pallete='white'
          label='Domain'
          />
        <Box sx={{ mt: '30px' }}>
          <Input
            variant='sell'
            pallete='white'
            label='Amount'
            info="0 USD"
          >
            <Beam/>
          </Input>
        </Box>
        <Box sx={{ my: '30px' }}>
        <Select items={[]} setActiveItem={() => {}} />
        </Box>
        <Flex sx={{ justifyContent: 'center' }}>
          <Box sx={{ mr: '30px' }}>
            <CloseBtn toggle={toggle}/>
          </Box>
            <SellBtn onConfirm={() => console.log('confirm')}/>
        </Flex>
    </Container>
    </Modal>
  )
}