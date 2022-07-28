import React, { FC } from 'react';
import { Container, Paragraph, Link } from 'theme-ui';
import { PageTitle } from '@app/components/PageTitle/PageTitle';

const About: React.FC = () => {
  return (
    <>
    <PageTitle title="About"/>
    <Container sx={{ p: 5, borderRadius: 10, bg: 'rgba(255,255,255,0.1)'}}>
      <Paragraph variant='block'>
      This proposal's expectation is to produce a community signal on a grant. Full details and discussions thus far can be found at:
      </Paragraph>

      <Link href="https://forum.sushi.com/t/proposal-community-enabled-analytics-for-sushi/5516" variant="link" >
      https://forum.sushi.com/t/proposal-community-enabled-analytics-for-sushi/5516
      </Link>
      <Paragraph variant='block'>
      Community-Enabled Analytics (CEA) is proposed as a solution to develop a community of nearly 500 individuals that attack analytic challenges in real time for Sushi. 
      The program is designed to drive on-demand data needs - as well as customer acquisition, ecosystem growth and token circulation.
      </Paragraph>
      <Paragraph variant='block'>
      The forum post describes CEO as a free solution with a bounty program to incentivize and reward community members for learning about, analyzing, and publishing blockchain data.  
      </Paragraph>
      <Paragraph variant='block'>
      The proposal requests a grant of 1M USD annually in $SUSHI to fund the CEA program for Sushi, which may be renewed on an annual basis.
      </Paragraph>
      <Paragraph variant='block'>
      → 50% of this will be delivered to ecosystem community members as bounties ($41,667 per month)
      </Paragraph>
    </Container>
    </>
  )
}

export default About;