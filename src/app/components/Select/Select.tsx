import React from 'react';
import ArrowDown from '../../assets/icons/arrow-down.svg';
import { Label, CustomSelect } from './Select.style';

interface items {
  id: string,
  name: string;
}
interface SelectProps {
  items: items[];
  setActiveItem: (id: string) => void;
}
export const Select: React.FC<SelectProps> = ({ items, setActiveItem }) => {
  const [show, setShow] = React.useState(false);

  return (
    <div>
        <Label>Buyer’s Public Key</Label>
    <CustomSelect>
      <div className="selected" onClick={() => setShow(true)}>
        Some Value
        <ArrowDown className="arrow"/>
      </div>
      {
        show && (
          <div className="items">
            {
              items.map((item) => {
                return (
                  <div key={item.id} onClick={() => setActiveItem(item.id)}>
                  <span>{item.name}</span>
                </div>
                )
              })
            }
          </div>
        )
      }
    </CustomSelect>
  </div>
  )
}