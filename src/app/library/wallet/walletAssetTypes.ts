/** Aligned with dao-voting-app `core/types.ts` `IAsset` / `IMetadataPairs`. */

export interface IMetadataPairs {
  N?: string;
  NTHUN?: string;
  SCH_VER?: string;
  SN?: string;
  UN?: string;
  OPT_COLOR?: string;
}

export interface IAsset {
  asset_id: number;
  metadata: string;
  parsedMetadata?: IMetadataPairs;
  metadata_pairs?: IMetadataPairs;
}
