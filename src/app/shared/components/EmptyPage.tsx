import React from 'react';
import { styled } from '@linaria/react';
import { IconEmptyPage } from '@app/shared/icons';

interface EmptyPageProps {
    emptyText?: string
}

const Container = styled.div`
      display: flex;
      flex-direction: column;
      align-items: center;
      position: absolute;
      top: 50%;
      width: 95%;
      max-width: 1200px;
`;
const Text = styled.span`
      color: rgba(255, 255, 255, .5);
      text-align: center;
      font-family: SFProDisplay, sans-serif;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      user-select: none;
`;
const EmptyPage: React.FC<EmptyPageProps> = ({ emptyText }) => {
  const text = emptyText || 'You do not hold any domains';

  return (
    <Container>
      <IconEmptyPage style={{ filter: ' brightness(50%)', marginBottom: '30px' }} />
      <Text>{text}</Text>
    </Container>
  );
};

export default EmptyPage;
