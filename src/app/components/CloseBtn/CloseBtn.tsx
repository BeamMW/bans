import React from 'react';
import { Text } from 'theme-ui';
import Button from '../../components/Button';
import Cancel from "../../assets/icons/cancel.svg";

interface CloseBtnProps {
  toggle: () => void;
  text?: string;
}

export const CloseBtn:React.FC<CloseBtnProps> = ({ toggle, text = 'close' }) => {
  return (
    <Button
    variant='custom' 
    pallete='ghost'
    onClick={toggle}
    padding="10px 24px"
    width='fit-content'
    borderRadius='50px'
    height='auto'
    >
     <Cancel width={'14px'} height={'14px'} />
     <Text sx={{ ml:'9px', fontWeight: 'bold' }}>{ text }</Text>
   </Button>
  )
}