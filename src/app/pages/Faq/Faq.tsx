import React from 'react';
import { PageTitle } from '../../components/PageTitle/PageTitle';
import Accordion from '../../views/Accordion/Accordion';
import About from '@app/views/About/About';
import { Container, Flex, Heading } from 'theme-ui';
const Faq: React.FC = () => {
  return (
    <>
      <PageTitle title="FAQ" />
      <Accordion />
    </>
  )
}

export default Faq;