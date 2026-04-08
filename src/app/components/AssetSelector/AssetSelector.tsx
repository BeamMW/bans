import React, { useState, useRef, useMemo } from 'react';
import { Text } from 'theme-ui';
import ArrowDown from '@app/assets/icons/arrow-down.svg';
import useOnClickOutside from '@app/hooks/outsideClickHandlers/useOnClickOutside';
import {
  BEAM_ASSET,
  assetDisplayWithId,
  assetMatchesQuery,
  type IAsset,
} from '@app/library/wallet/assetsList';
import { Trigger, DropdownWrap, SearchInput, List, OptionRow, EmptyMsg } from './AssetSelector.style';
import AssetIcon from './AssetIcon';

function getAssetForAid(aid: number, list: IAsset[]): IAsset {
  const found = list.find((a) => a.asset_id === aid);
  if (found) return found;
  if (aid === 0) return BEAM_ASSET;
  return { asset_id: aid, metadata: '', parsedMetadata: {} };
}

interface AssetSelectorProps {
  value: number;
  onChange: (aid: number) => void;
  /**
   * Enriched wallet assets (same shape as dao-voting-app treasury → VaultDepositPopup).
   * BEAM is prepended internally; do not pass asset_id 0 unless it is the real wallet row.
   */
  assets?: IAsset[];
  icon?: React.ReactNode;
}

export const AssetSelector: React.FC<AssetSelectorProps> = ({
  value,
  onChange,
  assets = [],
  icon,
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => setOpen(false));

  const allAssets = useMemo(() => {
    const withoutBeam = assets.filter((a) => a.asset_id !== 0);
    return [BEAM_ASSET, ...withoutBeam];
  }, [assets]);

  const selectedAsset = useMemo(
    () => getAssetForAid(value, allAssets),
    [value, allAssets]
  );

  const filteredOptions = useMemo(() => {
    const q = search.trim();

    if (q === '') {
      const list = allAssets.length ? allAssets : [BEAM_ASSET];
      if (value !== 0 && !list.some((a) => a.asset_id === value)) {
        return [getAssetForAid(value, list), ...list];
      }
      return list;
    }

    return allAssets.filter((a) => assetMatchesQuery(a, q));
  }, [allAssets, search, value]);

  const qTrim = search.trim();
  const showEmpty = qTrim !== '' && filteredOptions.length === 0;
  const displayOptions = showEmpty ? [] : filteredOptions;

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
      <Trigger type="button" onClick={() => setOpen(!open)}>
        <span className="trigger-icon">{icon ?? <AssetIcon asset_id={selectedAsset.asset_id} />}</span>
        <Text
          as="span"
          sx={{
            m: 0,
            lineHeight: '20px',
            fontSize: '14px',
            display: 'inline-flex',
            alignItems: 'center',
          }}
        >
          {assetDisplayWithId(selectedAsset.asset_id, selectedAsset.parsedMetadata)}
        </Text>
        <span className="trigger-arrow">
          <ArrowDown />
        </span>
      </Trigger>
      {open && (
        <DropdownWrap>
          <SearchInput
            placeholder="Search by name or id…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.stopPropagation()}
            autoFocus
          />
          <List>
            {showEmpty ? (
              <EmptyMsg>No assets found</EmptyMsg>
            ) : (
              displayOptions.map((asset) => (
                <OptionRow
                  key={asset.asset_id}
                  onClick={() => {
                    onChange(asset.asset_id);
                    setOpen(false);
                    setSearch('');
                  }}
                >
                  <span className="option-icon">
                    <AssetIcon asset_id={asset.asset_id} />
                  </span>
                  <span>{assetDisplayWithId(asset.asset_id, asset.parsedMetadata)}</span>
                </OptionRow>
              ))
            )}
          </List>
        </DropdownWrap>
      )}
    </div>
  );
};
