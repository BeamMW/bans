import React, { useState } from 'react';
import styled from 'styled-components';
import { Text, Divider, Paragraph } from 'theme-ui';

import Minus from "@app/assets/icons/minus.svg";
import Plus from "@app/assets/icons/plus.svg";
const Data = [
  {
    question: 'Question#1',
    answer: 'Brian NFT collection by Braindom Games is a limited collection of 5,000 unique 3D NFTs with hundreds of unique attributes captured on Ethereum blockchain. Brian NFT collection is inspired by one of the most popular puzzle and brain teaser games ever - Braindom.'
  },
  {
    question: 'Question#2',
    answer: 'Brian NFT collection by Braindom Games is a limited collection of 5,000 unique 3D NFTs with hundreds of unique attributes captured on Ethereum blockchain. Brian NFT collection is inspired by one of the most popular puzzle and brain teaser games ever - Braindom.'
  },
  {
    question: 'Question#3',
    answer: 'Brian NFT collection by Braindom Games is a limited collection of 5,000 unique 3D NFTs with hundreds of unique attributes captured on Ethereum blockchain. Brian NFT collection is inspired by one of the most popular puzzle and brain teaser games ever - Braindom.'
  },
  {
    question: 'Question#4',
    answer: 'Brian NFT collection by Braindom Games is a limited collection of 5,000 unique 3D NFTs with hundreds of unique attributes captured on Ethereum blockchain. Brian NFT collection is inspired by one of the most popular puzzle and brain teaser games ever - Braindom.'
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
                    <Paragraph variant='block' sx={{color: '#8897A8'}}>
                    {item.answer}
                    </Paragraph>
                  </Dropdown>
                ) : null}
              </React.Fragment>
            );
          })}
      </>
  );
};

export default Accordion;