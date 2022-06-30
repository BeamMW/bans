import React from 'react';
import styled from 'styled-components';

interface ContainerProps {
  border: boolean;
  height: string;
}

const Container = styled.div<ContainerProps>`
   display: flex;
   border-radius: 10px;
   border: ${props => props.border == 'none' ? 'none' : props.border ? '2px solid #00F6D2' : '2px solid #FF746B' };
   background-color: rgba(255,255,255,0.05);
   height: ${props => props.height};
   cursor: pointer;
   padding: 20px;
   margin-bottom:10px;
`

interface StyledCardProps {
  weight?: number;
}


const PaneLeft = styled.div<StyledCardProps>`
    flex: ${props => props.weight};
    align-self: center;
`

const PaneRight = styled(PaneLeft)`
    text-align: end;
`
interface SplitContainerProps {
    leftWeight: number;
    rightWeight: number;
    border?: boolean;
    height?: string;
    children: React.ReactNode[];
    handleClick?: () => void;
}
export const SplitContainer: React.FC<SplitContainerProps> = ({
  children,
  leftWeight = 1,
  rightWeight = 1,
  border = 'none',
  height= '79px',
  handleClick,
}) => {
  const [left, right] = children;
  return (
    <Container onClick={handleClick} border={border} height={height}>
      <PaneLeft weight={leftWeight}>
        {left}
      </PaneLeft>
      <PaneRight weight={rightWeight}>
        {right}
      </PaneRight>
    </Container>
  );
}

