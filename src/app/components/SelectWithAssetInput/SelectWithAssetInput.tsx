import React from 'react';
import { Box, Text } from 'theme-ui';
import { styled } from '@linaria/react';
import { css } from '@linaria/core';

import Select, { Option } from './Select/Select';
import   {
NphIcon,
BeamIcon,
BeamxIcon,
BtcIcon,
BchIcon,
WbtcIcon
} from '@app/assets/icons';
import { Label, CustomSelect } from './Select.style';

interface SelectWithInputProps {
  label?: string;
  showConvertedToUsd?: boolean;
  maxAmount?:boolean;
  color:string;
}

interface InputProps {
  color: string;
}

const Input = styled.input<InputProps>`
  font-family: 'ProximaNova';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  color: ${({ color }) => `var(--color-${color})`};
  background-color: rgba(255, 255, 255, 0);
  padding: 15px 20px;
  width: 90%;
  border-radius: 10px;
  border: none;
  cursor: auto;
`;

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    width: 100%;
    user-select: none;
    font-size: 14px;
    font-weight: normal;
    padding: 0;

    &.open {
      border: none;
      border-radius: 10px;
    }

    &.focus {
      background-color: rgba(255, 255, 255, 0.12);
    }
`

const selectClassName = css`
`;

const LabelStyled = styled.div`
  font-family: 'SFProDisplay';
  display: inline-block;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #FFFFFF;
  margin-left: 8px;
  vertical-align: super;
`;


export const SelectWithAssetInput: React.FC<SelectWithInputProps> = ({ label, color, showConvertedToUsd = true, maxAmount = false }) => {
  const [value, setValue] = React.useState();
  const assets = [
    {id: 0, asset_id: 0, title: 'BEAM', getIcon: ()=>{return <BeamIcon />}},
    {id: 1, asset_id: 1, title: 'BEAMX', getIcon: ()=>{return <BeamxIcon />}},
    {id: 1, asset_id: 1, title: 'NPH', getIcon: ()=>{return <NphIcon />}},
    {id: 1, asset_id: 1, title: 'BTC', getIcon: ()=>{return <BtcIcon />}},
    {id: 1, asset_id: 1, title: 'BCH', getIcon: ()=>{return <BchIcon />}},
    {id: 1, asset_id: 1, title: 'WBTC', getIcon: ()=>{return <WbtcIcon />}},
  ]
  const [activeAsset, setAsset] = React.useState(assets[0].id);
  const handleSelect = (next) => {
    setAsset(next);
  };

  return (
      <><Box>
      <Label>{label}</Label>
    </Box><CustomSelect>
        <Container>
          <Input color={color} />
          <Select value={activeAsset} className={selectClassName} onSelect={handleSelect}>
            {assets.map(({ getIcon, id, title }) => (
              <Option key={id} value={id}>
                {getIcon()}
                <LabelStyled>{title}</LabelStyled>
              </Option>
            ))}
          </Select>
        </Container>
      </CustomSelect>
      {
       showConvertedToUsd && <Text variant='subText' sx={{ padding: '6px 20px' }}><>{ 0 } USD</></Text>
      }
      </>
  )
}