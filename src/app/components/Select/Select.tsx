import React from 'react';
import ArrowDown from '../../assets/icons/arrow-down.svg';
import { Label, CustomSelect } from './Select.style';

interface items {
  id: number,
  name: string;
}
interface SelectProps {
  items: items[];
  setActiveItem: () => void;
}
export const Select: React.FC<SelectProps> = ({ items, setActiveItem }) => {
  const [show, setShow] = React.useState(false);
  const testItems = [{
    id:1,
    name: 'testName'
  },
  {
    id:2,
    name: 'testName'
  },
  {
    id:3,
    name: 'testName'
  },
  {
    id:4,
    name: 'testName'
  }];

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
              testItems.map((item) => {
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