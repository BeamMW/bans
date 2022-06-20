import React, { FC } from 'react';
import { BackButton } from '../BackButton/BackButton';
import { TitleContainer, Title, TitleChildren } from './PageTitle.style';

export interface PageTitleProps {
  title: string;
  children?: React.ReactNode;
}

export const PageTitle:FC<PageTitleProps> = ({ title, children }) => {

  return (
  <TitleContainer>
    <BackButton text="back"/>
    <Title>{ title }</Title>
    <TitleChildren>
      { children }
    </TitleChildren>
  </TitleContainer>
  )
}