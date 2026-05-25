import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectFundsByAsset } from '@app/store/BansStore/selectors';
import { loadMergedAssetsLikeTreasury, type IAsset } from '@app/library/wallet/assetsList';

/**
 * Same pipeline as dao-voting-app `loadTreasuryDataSaga` asset steps, with
 * `extraAssetIds` from BANS `userView.funds.byAsset` (like vault `funds[].aid`).
 *
 * @param reloadWhen — e.g. modal `isShown`: re-fetch when it toggles so a failed
 *   initial `assets_list` can retry when the user opens Send / Sell (same pattern
 *   as keeping those modals mounted under `Tabs`).
 */
export function useWalletAssetsForSelector(reloadWhen?: unknown): IAsset[] {
  const byAsset = useSelector(selectFundsByAsset);
  const [assets, setAssets] = useState<IAsset[]>([]);

  useEffect(() => {
    let cancelled = false;
    const extraIds = Object.keys(byAsset ?? {}).map(Number);
    loadMergedAssetsLikeTreasury(extraIds)
      .then((merged) => {
        if (!cancelled) setAssets(merged);
      })
      .catch(() => {
        if (!cancelled) setAssets([]);
      });
    return () => {
      cancelled = true;
    };
  }, [byAsset, reloadWhen]);

  return assets;
}
