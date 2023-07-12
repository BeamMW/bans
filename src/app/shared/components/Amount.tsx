import React from 'react';
import { styled } from '@linaria/react';
import { useSelector } from 'react-redux';
import { Rate } from '@app/shared/components/index';
import { IconBeam } from '@app/shared/icons';
import { css } from '@linaria/core';
import { truncate } from '@core/appUtils';

interface AmountProps {
  size: string,
  value: number,
  showConvertedToUsd?: boolean,
  equalizer?: any
}

interface ContainerStyles {
  size: string,
}

const Container = styled.div<ContainerStyles>`
  font-size: ${(props) => props.size};
  font-weight: 700;
  display: flex;
  font-family: 'SFProDisplay', sans-serif;
  font-weight: bolder;
  margin-right: 4px;
  d
  //align-items: ${(props) => (props.showConvertedToUsd ? 'flex-start' : 'center')};

  & .text {
    font-size: ${(props) => props.size};
    white-space: nowrap;
  }

  & > *:not(:first-child) {
    margin-left: 10px;
  }
`;

const Section = styled.div`
display: flex;
  flex-direction: column;
`;
const Text = styled.span`
  color: #FFF;
  font-family: SFProDisplay, sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
const styleRate = css`
margin-left: 0px ;
`;
const UsdEqualizer: React.FC<{ equalizer: any }> = ({ equalizer }) => (
  <Flex sx={{
    px: '20px', opacity: 0.5, fontSize: '14px', fontWeight: '300',
  }}
  >
    <Text>
      {equalizer()}
      {' '}
      USD
    </Text>
  </Flex>
);

const Amount: React.FC<AmountProps> = ({ size, value, showConvertedToUsd = false }) =>
// const getIconStyles = () => ({
//   width: `${parseInt(size.substring(0, size.length - 2)) + 6}px`,
// });

  (
    <Container size={size}>
      <IconBeam />
      <Section>
        <Text variant="text" className="text">
          { value.toFixed(2) }
          {' '}
          BEAM
        </Text>
        {
                    showConvertedToUsd
                   && <Rate value={+value} className={styleRate} />
                }
      </Section>
    </Container>
  );
export default Amount;
