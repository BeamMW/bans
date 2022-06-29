import React from 'react';
import ArrowDown from '../../assets/icons/arrow-down.svg';
import { Label, CustomSelect } from './Select.style';

interface items {
  id: string,
  name: string;
}
interface SelectProps {
  items: items[];
  activeItem: string;
  setActiveItem: (id: string) => void;
}
export const Select: React.FC<SelectProps> = ({ items, setActiveItem, activeItem }) => {
  const [show, setShow] = React.useState(false);

  return (
    <div>
        <Label>Domain</Label>
    <CustomSelect>
      <div className="selected" onClick={() => setShow(true)}>
        {activeItem ? activeItem : items[0].name}
        <ArrowDown className="arrow"/>
      </div>
      {
        show && (
          <div className="items">
            {
              items.map((item) => {
                return (
                  <div key={item.id} onClick={() => { setActiveItem(item.name); setShow(false) }}>
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