import React from 'react';
import { Text, Paragraph } from 'theme-ui';
import ArrowDown from '@app/assets/icons/arrow-down.svg';
import { Label, CustomSelect } from './Select.style';
import { DomainPresenterType } from '@app/library/bans/DomainPresenter';
import useOnClickOutside from '@app/hooks/outsideClickHandlers/useOnClickOutside';

interface items {
  id: string,
  name: string;
  domain: DomainPresenterType;
}
interface SelectProps {
  items: items[];
  activeItem: any;
  setActiveItem: (item: any) => void;
  showSuffix?: boolean;
}
export const Select: React.FC<SelectProps> = ({ items, setActiveItem, activeItem, showSuffix }) => {
  const [show, setShow] = React.useState(false);
  const ref = React.useRef(null);

  const handleClose = () => {
    setShow(false);
  }

  useOnClickOutside(ref, handleClose);

  return (
    <div>
    <Label>Domain</Label>
    <CustomSelect>
      <div className="selected" ref={ref} onClick={() => setShow(!show)}>
          <Paragraph sx={{
            fontSize: '16px',
            fontFamily: 'SFProDisplay',
            fontWeight: 700,
            lineHeight: '19px',
            fontStyle: 'normal',
          }}
          >
            {!!activeItem ?  activeItem?.name : items[0]?.domain?.name}
            { showSuffix && <Text sx={{color: 'rgba(255,255,255,0.5)'}}>.beam</Text> }
          </Paragraph>
        <ArrowDown className="arrow" onClick={(e:React.MouseEvent<SVGElement, MouseEvent>) => { handleClose(); e.stopPropagation(); }}/>
      </div>
      {
        show && (
          <div className="items">
            {
              items.map((item) => {
                return (
                  <div key={item.id} onClick={() => { setActiveItem(item); setShow(false) }}>
                  <Paragraph sx={{
                    fontSize: '16px',
                    fontFamily: 'SFProDisplay',
                    fontWeight: 700,
                    lineHeight: '19px',
                    fontStyle: 'normal',
                  }}>
                   {item.name}
                   { showSuffix && <Text sx={{color: 'rgba(255,255,255,0.5)'}}>.beam</Text> }
                  </Paragraph>
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