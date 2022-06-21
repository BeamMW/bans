import React from "react";
import { Text } from "theme-ui";
import Button from './../Button';
import Recieve from '../../assets/icons/recieve.svg'

interface WithDrawButtonProps {
  text: string
}
export const WithDrawButton:React.FC<WithDrawButtonProps> = ({text}) => {
  return (
    <Button variant="icon" pallete="transparent" width="auto" height="100%" style={{ marginLeft: '20px' }}>
      <Recieve/>
        <Text sx={{color: '#0BCCF7', fontWeight: 700, ml:2, lineHeight: '17px'}}>{ text }</Text>
    </Button>
  );
};