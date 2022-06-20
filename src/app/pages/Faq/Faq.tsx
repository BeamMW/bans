import React from 'react';
import { PageTitle } from '../../components/PageTitle/PageTitle';
import Accordion from '../../views/Accordion/Accordion';

const Faq: React.FC = () => {
  return (
    <>
      <PageTitle title="FAQ" />
      <Accordion />
    </>
  )
}

export default Faq;