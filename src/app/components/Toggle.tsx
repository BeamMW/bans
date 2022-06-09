import { styled } from '@linaria/react';
import React from 'react';
import { Checkbox, Container, Input, Label } from 'theme-ui';

interface ToggleProps {
  value?: boolean;
  onChange?: React.ChangeEventHandler;
}

const InputStyled = styled.input`
  position: absolute;
  ]z-index: -1;
  top: 0;
  left: 0;
  opacity: 0;
`;

const TrackStyled = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  border: solid 1px var(--color-green);
  background-color: rgba(0, 251, 209, 0.1);
`;

const SliderStyled = styled.div<{ active: boolean }>`
  position: absolute;
  top: 2px;
  left: 2px;
  background-color: var(--color-green);
  width: 16px;
  height: 16px;
  border-radius: 50%;

  input[type='checkbox']:checked ~ & {
    left: 18px;
  }
`;

const Toggle: React.FC<ToggleProps> = ({ id, value, onChange }) => (
  <Label sx={{
    position: "relative",
    width: "36px",
    height: "20px",
    cursor: "pointer",
  }}>
    <Checkbox checked={value} onChange={onChange} />
    <TrackStyled />
    <SliderStyled active={value} />
  </Label>
);

export default Toggle;
