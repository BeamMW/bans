import React, { useEffect } from "react";
import { Text } from "theme-ui";
import { Amount } from './../Amount/Amount';
import { Container } from './Balance.style';
import { WithDrawButton } from "../WithdrawButton/WithDrawButton";
import { WithdrawAction } from "@app/views/Actions/WithdrawAction";
import { useCurrentTransactionState } from "@app/library/transaction-react/useCurrentTransactionState";
import { IsTransactionPending } from "@app/library/transaction-react/IsTransactionStatus";
import store from "index";
import { reloadAllUserInfo } from "@app/store/BansStore/actions";
import BeamDappConnector from "@core/BeamDappConnector.js";
import AssetIcon from "@app/components/AssetSelector/AssetIcon";

interface BalanceProps {
  balance?: string;
  balances?: Record<number, number>;
  assetLabels: Map<number, string>;
}

export const Balance: React.FC<BalanceProps> = ({ balance, balances, assetLabels }) => {

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

  const hasByAsset = balances && Object.keys(balances).length > 0;
  const assetEntries = hasByAsset
    ? Object.entries(balances).filter(([, amount]) => amount > 0)
    : [];
  const hasAnyBalance = hasByAsset
    ? assetEntries.length > 0
    : !!balance && !!+balance;

  return (
    <Container>
      <div className="balance-main">
        <div className="description">Current balance</div>
        {hasByAsset && assetEntries.length > 0 ? (
          <div className="balance-rows">
            {assetEntries.map(([aidStr, amount]) => {
              const aid = parseInt(aidStr, 10);
              const label = aid === 0 ? 'BEAM' : (assetLabels.get(aid) || `Asset ${aid}`);
              return (
                <React.Fragment key={aid}>
                  <AssetIcon asset_id={aid} className="balance-asset-icon" />
                  <Text className="balance-cell--label" sx={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>{label}:</Text>
                  <Text className="asset-amount">
                    {BeamDappConnector.grothToBeam(amount)}
                  </Text>
                </React.Fragment>
              );
            })}
          </div>
        ) : (
          <Amount value={BeamDappConnector.grothToBeam(balance || 0)} size='20px' />
        )}
      </div>
      {
        hasAnyBalance ? (
          <div className="withdraw">
            <WithdrawAction
              transactionId={TRANSACTION_ID}
              change={"withdrawAll"}
              disabled={isTransactionPending}
            >
              <WithDrawButton text='withdraw all' />
            </WithdrawAction>
          </div>
        ) : <></>
      }
    </Container>
  )
}