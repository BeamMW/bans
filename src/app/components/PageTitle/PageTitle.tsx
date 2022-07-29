import React, { FC } from 'react';
import { TitleContainer, Title, TitleChildren } from './PageTitle.style';

export interface PageTitleProps {
  title: string;
  children?: React.ReactNode;
}

export const PageTitle:FC<PageTitleProps> = ({ title, children }) => {

  return (
  <TitleContainer>
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