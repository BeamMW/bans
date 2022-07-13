import React from 'react';
import { PageTitle } from '../../components/PageTitle/PageTitle';
import Accordion from '../../views/Accordion/Accordion';
import About from '@app/views/About/About';
const Faq: React.FC = () => {
  return (
    <>
      <PageTitle title="FAQ" />
      <Accordion />
    
      <About/>
    </>
  )
}

export default Faq;