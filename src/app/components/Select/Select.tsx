import React from 'react';
import ArrowDown from '@app/assets/icons/arrow-down.svg';
import { Label, CustomSelect } from './Select.style';
import { DomainPresenterType } from '@app/library/bans/DomainPresenter';

interface items {
  id: string,
  name: string;
  domain: DomainPresenterType;
}
interface SelectProps {
  items: items[];
  activeItem: any;
  setActiveItem: (item: any) => void;
}
export const Select: React.FC<SelectProps> = ({ items, setActiveItem, activeItem }) => {
  const [show, setShow] = React.useState(false);

  return (
    <div>
    <Label>Domain</Label>
    <CustomSelect>
      <div className="selected" onClick={() => setShow(true)}>
        {!!activeItem ? activeItem?.name : items[0]?.domain?.name}
        <ArrowDown className="arrow"/>
      </div>
      {
        show && (
          <div className="items">
            {
              items.map((item) => {
                return (
                  <div key={item.id} onClick={() => { setActiveItem(item); setShow(false) }}>
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