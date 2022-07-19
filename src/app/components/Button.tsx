import React from 'react';
import styled from "styled-components"
import { ButtonVariant, Pallete } from '../core/types';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.FC;
  pallete?: Pallete;
  variant?: ButtonVariant;
  width?: string;
  height?: string;
  borderRadius?: string;
  padding?: string;
}

const BaseButtonStyled = styled.button<ButtonProps>`
  &[disabled] {
    opacity: 0.5;

    &:hover,
    &:active {
      box-shadow: none !important;
      cursor: not-allowed !important;
    }
  }
`;

const ButtonStyled = styled(BaseButtonStyled)`
  display: block;
  width: 100%;
  max-width: 230px;
  margin-bottom: 10px;
  padding: 10px 24px;
  border: none;
  border-radius: 22px;
  background-color: ${({ pallete }) => `var(--color-${pallete})`};
  text-align: center;
  font-weight: 700;
  font-size: 14px;
  color: var(--color-dark-blue);

  &:hover,
  &:active {
    box-shadow: 0 0 8px white;
    cursor: pointer;
  }

  > svg {
    vertical-align: middle;
    margin-right: 10px;
  }
`;

const GhostBorderedButtonStyled = styled(ButtonStyled)`
  background-color: rgba(0, 246, 210, .1);
  color: ${({ pallete }) => `var(--color-${pallete})`};
  border: ${({ pallete }) => `1px solid var(--color-${pallete})`};
  max-width: 165px;
  padding: 8px 18px;

  &:hover,
  &:active {
    box-shadow: 0 0 8px rgba(0, 246, 210, 0.15);
    background-color: rgba(0, 246, 210, 0.3);
  }

  > svg {
    vertical-align: middle;
    margin-right: 10px;
  }
`;

const GhostButtonStyled = styled(ButtonStyled)`
  background-color: rgba(255, 255, 255, 0.1);
  color: white;

  &:hover,
  &:active {
    box-shadow: 0 0 8px rgba(255, 255, 255, 0.15);
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

const BlockButtonStyled = styled(GhostButtonStyled)`
  width: 100%;
  max-width: none;
  padding: 18px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.03);
  font-size: 14px;
  text-align: left;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: ${({ pallete }) => `var(--color-${pallete})`};

  &:hover,
  &:active {
    background-color: rgba(255, 255, 255, 0.1);
    box-shadow: none;
  }
`;

const IconButtonStyled = styled(BaseButtonStyled)`
  font-family: 'SFProDisplay', sans-serif;
  display: inline-block;
  vertical-align: sub;
  margin: ${({ pallete }) => `0 0 0 ${pallete === 'transparent' ? '0px' : '10px'}`};
  font-size: 14px;
  border: none;
  cursor: pointer;
  user-select: none;
  background-color: ${({ pallete }) => `var(--color-${pallete})`};
  color: ${({ pallete }) => `var(--color-${pallete})`};
  padding: 0;
  width: ${({ width }) => `${width}`};
  height: ${({ height }) => `${height}`};
  border-radius: 10px;
  > svg {
    vertical-align: middle;
  }
`;

const LinkButtonStyled = styled(IconButtonStyled)`
  margin: 20px 0;
  font-size: 14px;
  font-weight: 700;
  color: ${({ pallete }) => `var(--color-${pallete})`};

  > svg {
    vertical-align: middle;
    margin-right: 10px;
  }
`;

const CustomButtonStyled = styled(BaseButtonStyled)`
  font-family: 'SFProDisplay', sans-serif;
  white-space: nowrap;
  font-weight: 700;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  border: none;
  cursor: pointer;
  user-select: none;
  position: relative;
  color: white;
  width: ${({ width }) => `${width}`};
  height: ${({ height }) => `${height}`};
  padding: ${({ padding }) => `${padding}`};
  border-radius: ${({ borderRadius }) => `${borderRadius}`};
  background-color: ${({ pallete }) => `var(--color-${pallete})`};

  &:not(.disabled):hover {
    box-shadow: 0 0 8px white;
    background-color: ${({ pallete }) => `var(--color-${pallete})`};
  }

  &.disabled {
    opacity: 0.6;
    cursor: auto;
  }

  &:focus {
    outline: none;
  }
`

const VARIANTS = {
  regular: ButtonStyled,
  ghost: GhostButtonStyled,
  ghostBordered: GhostBorderedButtonStyled,
  link: LinkButtonStyled,
  icon: IconButtonStyled,
  block: BlockButtonStyled,
  custom: CustomButtonStyled,
};

const Button: React.FC<ButtonProps> = ({
  type = 'button',
  pallete = 'green',
  variant = 'regular',
  width = '33px',
  height = '33px',
  borderRadius = '50px',
  padding = '11px 25px 11px 22px',
  icon: IconComponent,
  children,
  ...rest
}) => {
  const ButtonComponent = VARIANTS[variant];

  return (
    <ButtonComponent 
      type={type}
      pallete={pallete}
      width={width}
      height={height}
      padding={padding}
      borderRadius={borderRadius}
      {...rest}
    >
      {!!IconComponent && <IconComponent />}
      {children}
    </ButtonComponent>
  );
};

export default Button;
