import React, { FC } from 'react';
import { Flex, Text } from 'theme-ui'

export interface PageHeaderProps {
  title: string;
  icon? : React.FC;
}

export const PageHeader:FC<PageHeaderProps> = ({ title, icon: IconComponent }) => {
  return (
    <Flex sx={{flexDirection: 'column', alignItems: 'center' }}>
       { !!IconComponent && <IconComponent/> }
      <Text sx={{mt: 5, textTransform:'uppercase', letterSpacing:'3.1px', fontWeight:700}}>{ title }</Text>
    </Flex>
  )
}