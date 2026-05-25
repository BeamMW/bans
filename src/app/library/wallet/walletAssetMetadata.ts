/**
 * Port of dao-voting-app `core/appUtils.ts` — parse + enrich used with `LoadAssetsList` / `GetAssetInfo`.
 */
import { IAsset, IMetadataPairs } from './walletAssetTypes';

export type { IAsset, IMetadataPairs } from './walletAssetTypes';

/** Same parsing as dex-app (values may contain '='). */
export function parseMetadata(metadata: string | undefined | null): IMetadataPairs {
  if (!metadata || typeof metadata !== 'string') {
    return {} as IMetadataPairs;
  }
  const splittedMetadata = metadata.split(';');
  splittedMetadata.shift();
  return splittedMetadata.reduce((accumulator: IMetadataPairs, value: string) => {
    if (!value) return accumulator;
    const data = value.split(/=(.*)/s);
    const k = data[0];
    const v = data[1] ?? '';
    return { ...accumulator, [k]: v };
  }, {} as IMetadataPairs);
}

export function assetShortLabel(m: IMetadataPairs | undefined): string {
  if (!m) return '';
  return (m.SN || m.UN || m.N || '').trim();
}

/** Port of dao-voting-app `enrichAssetsWithMetadata`. */
export function enrichAssetsWithMetadata(assets: any[]): IAsset[] {
  return assets.map((a: any) => {
    const rawId = a.asset_id ?? a.aid ?? 0;
    const n = Number(rawId);
    const id = Number.isFinite(n) ? n : 0;
    let parsedMetadata: IMetadataPairs;
    if (
      a.metadata_pairs
      && typeof a.metadata_pairs === 'object'
      && !Array.isArray(a.metadata_pairs)
    ) {
      parsedMetadata = a.metadata_pairs as IMetadataPairs;
    } else if (typeof a.metadata === 'string') {
      parsedMetadata = parseMetadata(a.metadata);
    } else {
      parsedMetadata = {} as IMetadataPairs;
    }
    return {
      ...a,
      asset_id: id,
      metadata: typeof a.metadata === 'string' ? a.metadata : '',
      parsedMetadata,
    };
  });
}
