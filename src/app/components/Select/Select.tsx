import React from 'react';
import ArrowDown from '../../assets/icons/arrow-down.svg';
import { Label, CustomSelect } from './Select.style';

export const Select = () => {
  return (
    <div>
        <Label>Buyer’s Public Key</Label>
    <CustomSelect>
      <div className="selected">
        Some Value
        <ArrowDown className="arrow"/>
      </div>
      {/* <div className="items">
        <div>
          <span>option.name</span>
        </div>
      </div> */}
    </CustomSelect>
  </div>
  )
}