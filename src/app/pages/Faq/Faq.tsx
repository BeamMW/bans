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
      {/* <Container>
        <Flex sx={{ justifyContent: "center", alignItems:'center', alignContent:"center", minHeight: "50vh" }}>
          <Heading>Coming soon...</Heading>
        </Flex>
      </Container> */}
      {/* Waiting to be filled */}
      {/* <Accordion />
      <About/> */}
    </>
  )
}

export default Faq;