import React from 'react';
import { styled } from '@linaria/react';
import BeamIcon from '@app/assets/icons/beam.svg';
import AssetGlyph from '@app/assets/icons/asset.svg';
import { PALLETE_ASSETS } from '@app/constants';

interface AssetIconProps {
  asset_id?: number;
  className?: string;
}

const ContainerStyled = styled.div<{ color: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  width: 18px;
  height: 18px;
  margin-right: 8px;
  flex-shrink: 0;
  color: ${({ color }) => color};
`;

const AssetIcon: React.FC<AssetIconProps> = ({ asset_id = 0, className }) => {
  const IconComponent = asset_id === 0 ? BeamIcon : AssetGlyph;
  const color = PALLETE_ASSETS[asset_id] ?? PALLETE_ASSETS[asset_id % PALLETE_ASSETS.length];

  return (
    <ContainerStyled color={color} className={className}>
      <IconComponent />
    </ContainerStyled>
  );
};

export default AssetIcon;
