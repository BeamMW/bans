import React from "react";
import { Text } from "theme-ui";
import { Amount } from './../Amount/Amount';
import { Container } from './Balance.style';
import { WithDrawButton } from "../WithdrawButton/WithDrawButton";
import { useSelector } from "react-redux";
import { selectPublicKey } from "@app/store/BansStore/selectors";
import { useBansApi } from "@app/contexts/Bans/BansContexts";

interface BalanceProps {
  balance: string
}
export const Balance: React.FC<BalanceProps> = ({ balance }) => {

  const publicKey = useSelector(selectPublicKey());
  const { registeredMethods } = useBansApi();


  const withdrawHandler = () => {
    /* registeredMethods.userReceive().then(response =>
      registeredMethods.userReceive().then(response => {
        console.log(response);
      })) */
  }

  return (
    <Container>
      <div>
        <div className="description">Current balance</div>
        <Amount value={balance} size='20px' />
      </div>
      {
        balance && (
          <div className="withdraw">
            <WithDrawButton handler={withdrawHandler} text='withdraw all' />
          </div>
        )
      }
    </Container>
  )
}