import React, { useState } from 'react';
import styled from 'styled-components';
import { Text, Divider, Paragraph, Box } from 'theme-ui';

import Minus from "@app/assets/icons/minus.svg";
import Plus from "@app/assets/icons/plus.svg";
const Data = [
  {
    question: 'How to purchase a Beam Anonymous Naming Service (BANS) domain?',
    answer: <Paragraph variant='block' sx={{color: '#8897A8'}}>Follow this guide ______Link_____</Paragraph>
  },
  {
    question: 'How to send funds to a user’s BANS domain?',
    answer: <Paragraph variant='block' sx={{color: '#8897A8'}}>Open the BANS main screen → Send funds to BANS → enter the BANS name and amount and send.
    <br/>(Note: You can only send funds to other BANS domains from within the BANS DApp. At a later stage, beam wallet addresses can also be sent funds from within the BANS DApp.)</Paragraph>
  },
  {
    question: 'What can I send/receive using my BANS domain?',
    answer: <Paragraph variant='block' sx={{color: '#8897A8'}}>The current version supports sending and receiving $BEAM.
    <br/> In the future, we will activate functionality for multiple currencies supporting all tokens and NFTs on the Beam blockchain.</Paragraph>
  },
  {
    question: 'How can I sell my BANS domain?',
    answer: <Paragraph variant='block' sx={{color: '#8897A8'}}>For now, BANS domain can only be traded in the BANS DApp. 
    Navigate to your “contact” icon located on the top right, choose the BANS you wish to sell and select the price. 
    
    <br/> In later versions, BANS domains will be tradeable as an NFT on any marketplace.</Paragraph>
  },
  {
    question: 'What happens if I sold my BANS domain and received funds after I sold it? You will not be able to access to these funds. ',
    answer: <Paragraph variant='block' sx={{color: '#8897A8'}}>Always make sure to conduct transactions with BANS domains you own.<br/><br/>
    Alternatively, wait for all transactions linked to a BANS domain to complete, before listing it for sale.</Paragraph>
  }
];




const Wrap = styled.div`
  background: var(--color-half-opacity);
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  text-align: center;
  cursor: pointer;
  padding: 20px;
  margin: 10px 0;
  border-radius: 10px;
`;

const Dropdown = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding: 16px 20px 20px;
  margin-bottom: 20px;
`;

const Accordion = () => {
  const [clicked, setClicked] = useState(-1);

  const toggle = (index: number) => {
    if (clicked === index) {
      return setClicked(-1);
    }

    setClicked(index);
  };

  return (
      <>
          {Data.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <Wrap onClick={() => toggle(index)} key={index}>
                  <Text>{item.question}</Text>
                  <Text>{clicked === index ? <Minus /> : <Plus />}</Text>
                </Wrap>
                {clicked === index ? (
                  <Dropdown>
                    <Divider/>
                      {item.answer}
                  </Dropdown>
                ) : null}
              </React.Fragment>
            );
          })}
      </>
  );
};

export default Accordion;