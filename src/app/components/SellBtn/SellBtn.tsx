import React from 'react';
import { Text } from 'theme-ui';
import Sell from '../../assets/icons/send.svg';
import Button from '../Button';

interface SellBtnProps {
  onConfirm: () => void;
}
export const SellBtn:React.FC<SellBtnProps> = ({ onConfirm }) => {
  return (
    <Button
      variant='custom'
      onClick={onConfirm}
      padding="11px 25px 11px 22px"
      height='38px'
      width='fit-content'
      borderRadius='50px'
    >
     <Sell />
     <Text sx={{ ml:'9px', fontWeight: 'bold', color:'#032E49' }}>sell</Text>
    </Button>
  )
}