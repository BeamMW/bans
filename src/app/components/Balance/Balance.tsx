import React from "react";
import { Text } from "theme-ui";
import { Amount } from './../Amount/Amount';
import { Container } from './Balance.style';
import { WithDrawButton } from "../WithdrawButton/WithDrawButton";

interface BalanceProps {
  balance: string
}
export const Balance:React.FC<BalanceProps> = ({balance}) => {
  return (
    <Container>
    <div>
      <div className="description">Current balance</div>
       <Amount value="202" size='20px'/>
    </div>
    {
      balance && (
      <div className="withdraw">
        <WithDrawButton text='withdraw all'/>
      </div>  
      )
    }
  </Container>
  )
}