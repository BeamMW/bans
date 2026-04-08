import React, { useMemo } from "react";
import { PageTitle } from '@app/components/PageTitle/PageTitle';
import { Balance } from '@app/components/Balance/Balance';
import { MyTransactions } from '@app/views/MyTransactions/MyTransactions';
import { useSelector } from "react-redux";
import { selectFundsTotal, selectFundsByAsset } from "@app/store/BansStore/selectors";
import { useWalletAssetsForSelector } from "@app/hooks/useWalletAssetsForSelector";
import { assetShortLabel } from "@app/library/wallet/walletAssetMetadata";

const Transactions: React.FC = () => {
  const total = useSelector(selectFundsTotal);
  const byAsset = useSelector(selectFundsByAsset);
  const walletAssets = useWalletAssetsForSelector();
  const assetLabels = useMemo(() => {
    const map = new Map<number, string>();
    walletAssets.forEach((asset) => {
      map.set(asset.asset_id, assetShortLabel(asset.parsedMetadata));
    });
    return map;
  }, [walletAssets]);

  return (
    <>
      <PageTitle title="BANS' transactions"/>
      <Balance
        balance={total != null ? String(total) : "0"}
        balances={byAsset}
        assetLabels={assetLabels}
      />
      <MyTransactions assetLabels={assetLabels} />
    </>
  );
}

export default Transactions;