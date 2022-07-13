import React, { FC } from 'react';
import { BackButton } from '../BackButton/BackButton';
import { TitleContainer, Title, TitleChildren } from './PageTitle.style';

export interface PageTitleProps {
  title: string;
  showBackButton?: boolean;
  children?: React.ReactNode;
}

export const PageTitle:FC<PageTitleProps> = ({ title,showBackButton = true, children }) => {

  return (
  <TitleContainer>
    {
      showBackButton && <BackButton text="back"/>
    }
    <Title>{ title }</Title>
   {
    children && (
      <TitleChildren>
        { children }
      </TitleChildren>
    )
   }
  </TitleContainer>
  )
}