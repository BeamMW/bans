/**
 * Direct ports of dao-voting-app `core/api.tsx` wallet helpers:
 * `callApiWithRecovery`, `LoadAssetsList`, `GetAssetInfo`.
 */
import connector from '@core/connector';
import { parseMetadata } from './walletAssetMetadata';
import type { IAsset } from './walletAssetTypes';

async function callApiWithRecovery(method: string, params: Record<string, unknown>): Promise<any> {
  try {
    return await connector.callApi(method, params);
  } catch (error) {
    if (!(error instanceof Error) || error.message !== 'Wallet is locked') {
      throw error;
    }
    await connector.callApi('wallet_status', {});
    return await connector.callApi(method, params);
  }
}

/** Same as dao `LoadAssetsList`. */
export async function loadAssetsList(): Promise<IAsset[]> {
  const result: any = await callApiWithRecovery('assets_list', { refresh: true });
  const raw = Array.isArray(result)
    ? result
    : Array.isArray(result?.assets)
      ? result.assets
      : [];

  const assets: IAsset[] = raw.map((a: any) => {
    const n = Number(a.asset_id ?? a.aid ?? 0);
    return {
      ...a,
      asset_id: Number.isFinite(n) ? n : 0,
    };
  });
  return assets;
}

/** Same as dao `GetAssetInfo`. */
export async function getAssetInfo(assetId: number): Promise<IAsset | null> {
  try {
    const result: any = await callApiWithRecovery('get_asset_info', { asset_id: assetId });
    if (result == null) {
      return null;
    }
    const r = result as any;
    const id = Number(r.asset_id ?? assetId);
    const parsed =
      r.metadata_pairs && typeof r.metadata_pairs === 'object' && !Array.isArray(r.metadata_pairs)
        ? r.metadata_pairs
        : typeof r.metadata === 'string'
          ? parseMetadata(r.metadata)
          : {};
    return {
      asset_id: Number.isFinite(id) ? id : 0,
      metadata: typeof r.metadata === 'string' ? r.metadata : '',
      parsedMetadata: parsed,
    };
  } catch {
    return null;
  }
}
