import React from 'react';
import { styled } from '@linaria/react';
import { Text, Flex } from 'theme-ui';
import ArrowDown from '@app/assets/icons/arrow-down.svg';
import { Label, CustomSelect } from './Select.style';
import { useEffect } from 'react';
import useOnClickOutside from '@app/hooks/outsideClickHandlers/useOnClickOutside';
import HeartActive from '@app/assets/icons/heart-active.svg';
import CheckedIcon from '@app/assets/icons/checked.svg';
import ArrowTop from '@app/assets/icons/arrow-top.svg';

interface items {
  id: string,
  name: string;
}

interface SelectWithInputProps {
  items: items[];
  activeItem: string;
  setActiveItem: (id: string) => void;
  label?: string;
}

const Input = styled.input`
  font-size: 16px;
  font-weight: normal;
  color: white;
  background-color: rgba(255, 255, 255, 0);
  padding: 15px 20px;
  width: 90%;
  border-radius: 10px;
  border: none;

  &::placeholder {
    font-size: 16px;
  }
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

const SvgContainer = styled.div `
  width: 10%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const SelectWithInput: React.FC<SelectWithInputProps> = ({ items, setActiveItem, activeItem, label }) => {
  const [show, setShow] = React.useState(false);
  const [filteredResults, setFilteredResults] = React.useState([]);
  const ref = React.useRef(null)

  const searchItems = (searchValue: string) => {
    if (searchValue !== '') {
      const filteredData = items.filter((item) => {
          return item.name.toLowerCase().includes(searchValue.toLowerCase())
      })
        setShow(true);
        setFilteredResults(filteredData);
    }
    else {
        setFilteredResults(items);
        setShow(false);
    }
      setActiveItem(searchValue);
  }
  
  const handleArrowClick = () => {
    setShow(!show);
  }

  const handleClickOutside = () => {
    setShow(false);
  }

  useOnClickOutside(ref, handleClickOutside);
  
  useEffect(() => {
    setFilteredResults(items)
  },[items])



  return (
    <div>
    <Label>{label}</Label>
    <CustomSelect>
    <Container>
      <Input onChange={(e) => searchItems(e.target.value)} value={activeItem}/>
      <SvgContainer onClick={handleArrowClick}>
        {
          show ? <ArrowTop /> : <ArrowDown />
        }
      </SvgContainer>
    </Container>
      {
        show && (
          <div className="items" ref={ref}>
            {
              filteredResults.map((item) => {
                return (
                  <Flex key={item.id} onClick={() => { setActiveItem(item.name); setShow(false) }} sx={{alignItems:'center'}}>
                  <Text sx={{
                        fontStyle: 'normal',
                        fontWeight: '700',
                        fontSize: '16px',
                        lineHeight: '19px',
                        marginRight: '10px'
                  }}>{item.name}</Text>
                  {/* TODO: ADD Conditions */}
                  {
                    true ? <HeartActive/>: <CheckedIcon/>
                  }
                </Flex>
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