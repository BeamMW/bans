import React from "react";
import { Text } from "theme-ui";
import Button from '@app/components/Button';
import Recieve from '@app/assets/icons/recieve.svg'

interface WithDrawButtonProps {
  text: string,
  handler?: any
}
export const WithDrawButton:React.FC<WithDrawButtonProps> = ({text, handler = () => null}) => {
  return (
    <Button onClick={handler} variant="icon" pallete="transparent" width="auto" height="100%" style={{ marginLeft: '20px' }}>
      <Recieve/>
        <Text sx={{color: '#0BCCF7', fontWeight: 700, ml:2, lineHeight: '17px'}}>{ text }</Text>
    </Button>
  );
};