import React, { useEffect } from "react";
import { Text } from "theme-ui";
import { Amount } from './../Amount/Amount';
import { Container } from './Balance.style';
import { WithDrawButton } from "../WithdrawButton/WithDrawButton";
import { useSelector } from "react-redux";
import { selectPublicKey } from "@app/store/BansStore/selectors";
import { useBansApi } from "@app/contexts/Bans/BansContexts";
import { GROTHS_IN_BEAM } from "@app/constants";
import { Decimal } from "@app/library/base/Decimal";
import { WithdrawAction } from "@app/views/Actions/WithdrawAction";
import { useCurrentTransactionState } from "@app/library/transaction-react/useCurrentTransactionState";
import { IsTransactionPending } from "@app/library/transaction-react/IsTransactionStatus";
import store from "index";
import { reloadAllUserInfo } from "@app/store/BansStore/actions";
import { LoadingOverlay } from "../LoadingOverlay";

interface BalanceProps {
  balance: string
}
export const Balance: React.FC<BalanceProps> = ({ balance }) => {

  const TRANSACTION_ID = "WITHDRAW ALL";

  const transactionState = useCurrentTransactionState(TRANSACTION_ID);
  const isTransactionPending = IsTransactionPending({ transactionIdPrefix: TRANSACTION_ID });

  useEffect(() => {
    if (transactionState.id === TRANSACTION_ID && transactionState.type === "completed") {

      return () => {
        store.dispatch(reloadAllUserInfo.request());
      }
    }

  }, [transactionState]);

  return (
    <Container>
      <div>
        <div className="description">Current balance</div>
        <Amount value={Decimal.from(balance).div(GROTHS_IN_BEAM).toString()} size='20px' />
      </div>
      {
        balance && (
          <div className="withdraw">
            <WithdrawAction
              transactionId={TRANSACTION_ID}
              change={"withdrawAll"}
              disabled={isTransactionPending}
            >
              <WithDrawButton text='withdraw all' />
            </WithdrawAction>
          </div>
        )
      }
    </Container>
  )
}