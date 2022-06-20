import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
   display: flex;
   border-radius: 10px;
   background-color: rgba(255,255,255,0.05);
   height: 79px;
   cursor: pointer;
   padding: 20px;
`

interface StyledCardProps {
  weight?: number
}


const Pane = styled.div<StyledCardProps>`
    flex: ${props => props.weight};
    align-self: center ;
`

interface SplitContainerProps {
    leftWeight: number;
    rightWeight: number;
    children: React.ReactNode[];
    handleClick?: () => void;
}
export const SplitContainer: React.FC<SplitContainerProps> = ({
  children,
  leftWeight = 1,
  rightWeight = 1,
  handleClick,
}) => {
  const [left, right] = children;
  return (
    <Container onClick={handleClick}>
      <Pane weight={leftWeight}>
        {left}
      </Pane>
      <Pane weight={rightWeight}>
        {right}
      </Pane>
    </Container>
  );
}

