import { truncate } from '@app/library/base/appUtils';
import { getAssetInfo, loadAssetsList } from './daoWalletApi';
import { enrichAssetsWithMetadata, assetShortLabel } from './walletAssetMetadata';
import type { IAsset, IMetadataPairs } from './walletAssetTypes';

export type { IAsset, IMetadataPairs } from './walletAssetTypes';

/** Same as dao-voting-app VaultDepositPopup. */
export const BEAM_ASSET: IAsset = {
  asset_id: 0,
  metadata: '',
  parsedMetadata: { N: 'BEAM', SN: 'BEAM' },
};

const ASSET_LABEL_MAX = 6;

/** Same as dao-voting-app `assetDisplayWithId`. */
export function assetDisplayWithId(assetId: number, parsedMetadata: IMetadataPairs | undefined): string {
  if (assetId === 0) {
    return 'BEAM (id:0)';
  }
  const ticker = assetShortLabel(parsedMetadata) || 'Token';
  return `${truncate(ticker, ASSET_LABEL_MAX)} (id:${assetId})`;
}

/** Same as dao `VaultDepositPopup` `assetMatches`. */
export function assetMatchesQuery(asset: IAsset, query: string): boolean {
  if (!query) return true;
  const q = query.toLowerCase();
  const sn = (assetShortLabel(asset.parsedMetadata) || '').toLowerCase();
  const n = (asset.parsedMetadata?.N || '').toLowerCase();
  return sn.includes(q) || n.includes(q) || String(asset.asset_id).includes(q);
}

/**
 * Same asset merge as dao-voting-app `loadTreasuryDataSaga` (lines 44–60):
 * `LoadAssetsList` → `enrichAssetsWithMetadata` → `GetAssetInfo` for each missing id.
 * Here `extraAssetIds` stands in for vault `funds[].aid` (we use BANS balance keys).
 */
export async function loadMergedAssetsLikeTreasury(extraAssetIds: number[]): Promise<IAsset[]> {
  const rawAssets = await loadAssetsList();
  let assets = enrichAssetsWithMetadata(rawAssets || []);
  const have = new Set(assets.map((a) => Number(a.asset_id)));
  const missing = [
    ...new Set(
      extraAssetIds
        .map((id) => Number(id))
        .filter((id) => id > 0 && !have.has(id)),
    ),
  ];
  if (missing.length) {
    const extra = await Promise.all(missing.map((id) => getAssetInfo(id)));
    const merged = extra.filter(Boolean) as typeof assets;
    assets = [...assets, ...merged];
  }
  return assets;
}
