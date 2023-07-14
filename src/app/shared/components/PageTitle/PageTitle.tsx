import React, { FC } from 'react';
import { TitleContainer, Title, TitleChildren } from './PageTitle.style';

export interface PageTitleProps {
  title: string;
  children?: React.ReactNode;
}

 const PageTitle:FC<PageTitleProps> = ({ title, children }) => (
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
);
export default PageTitle;
