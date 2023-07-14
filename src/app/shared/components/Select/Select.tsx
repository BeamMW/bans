import React from 'react';
import { IDomains } from '@app/shared/interface';
import { IconArrowDown } from '@app/shared/icons';
import { Label, CustomSelect } from './Select.style';

interface items {
  id: string,
  name: string;
  domain: IDomains;
}
interface SelectProps {
  items: items[];
  activeItem: any;
  setActiveItem: (item: any) => void;
  showSuffix?: boolean;
}
export const Select: React.FC<SelectProps> = ({
  items, setActiveItem, activeItem, showSuffix,
}) => {
  const [show, setShow] = React.useState(false);
  const [item, setItem] = React.useState('');
  const ref = React.useRef(null);

  const handleClose = () => {
    setShow(false);
  };

  // useOnClickOutside(ref, handleClose);

  return (
    <div>
      <Label>Domain</Label>
      <CustomSelect ref={ref}>
        <div className="selected" onClick={() => setShow(!show)}>
          <p style={{
            fontSize: '16px',
            fontFamily: 'SFProDisplay',
            fontWeight: 700,
            lineHeight: '19px',
            fontStyle: 'normal',
          }}
          >
            {activeItem ? activeItem?.name : items[0]?.domain?.name}
            { showSuffix && <span style={{ color: 'rgba(255,255,255,0.5)' }}>.beam</span> }
          </p>
          <IconArrowDown className="arrow" onClick={(e:React.MouseEvent<SVGElement, MouseEvent>) => { handleClose(); e.stopPropagation(); }} />
        </div>
        {
        show && (
          <div className="items">
            {
              items.map((item) => (
                <div key={item.id} onClick={(e) => { setActiveItem(item); setShow(false); e.stopPropagation(); }}>
                  <p style={{
                    fontSize: '16px',
                    fontFamily: 'SFProDisplay',
                    fontWeight: 700,
                    lineHeight: '19px',
                    fontStyle: 'normal',
                  }}
                  >
                    {item.name}
                    { showSuffix && <span style={{ color: 'rgba(255,255,255,0.5)' }}>.beam</span> }
                  </p>
                </div>
              ))
            }
          </div>
        )
      }
      </CustomSelect>
    </div>
  );
};
