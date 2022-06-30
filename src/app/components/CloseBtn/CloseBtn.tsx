import React from 'react';
import { Text } from 'theme-ui';
import Button from '../../components/Button';
import Cancel from "../../assets/icons/cancel.svg";

interface CloseBtnProps {
  toggle: () => void;
}

export const CloseBtn:React.FC<CloseBtnProps> = ({ toggle }) => {
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
     <Cancel />
     <Text sx={{ ml:'9px', fontWeight: 'bold' }}>Close</Text>
   </Button>
  )
}