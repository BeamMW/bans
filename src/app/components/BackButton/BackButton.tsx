import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Text } from 'theme-ui'
import BackBtnIcon from '../../assets/icons/back.svg';

const BackBtn = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 14px;
    font-weight: bolder;
    letter-spacing: 1.5px;
    opacity: 0.9;

    & svg {
      margin-right: 0.25em;
      width: 14px;
      height: 14px;
    }
`

export const BackButton: React.FC<{text:string}> = ({text}) => {
  const navigate = useNavigate();
  return (
    <BackBtn onClick={() =>  navigate('/')}>
      <BackBtnIcon/>
    <Text sx={{ ml: 2 }}>{ text }</Text>
  </BackBtn>
  )
}