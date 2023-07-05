import React, { useState } from 'react';
import { styled } from '@linaria/react';
import Button from '@app/shared/components/Button';

import { css } from '@linaria/core';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  valid?: boolean;
  variant?: 'regular' | 'gray' | 'amount' | 'proposal';
  pallete?: 'purple' | 'blue' | 'white';
  margin?: 'none' | 'large';
  children?: React.ReactNode;
  errorMessage?: string;

}

const ContainerStyled = styled.div<InputProps>`
  position: relative;
  min-height: 50px;
  max-width: 650px;
  width: 100%;
  margin-bottom: ${({ margin }) => (margin === 'none' ? 0 : 50)}px;
  margin-top: 0;
  margin-left: auto;
  margin-right: auto;
`;

const InputStyled = styled.input<InputProps>`
  width: 100%;
  height: 33px;
  line-height: 31px;
  border: none;
  border-bottom: 2px solid transparent;
  background-color: transparent;
  font-size: 14px;
  color: white;

  &::placeholder {
    color: white;
    opacity: 0.5;
    font-size: 14px;
    transform: translateX(1px);
  }

  &[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const InputRegularStyled = styled(InputStyled)`
  border-color: ${({ valid }) => (valid ? 'var(--color-green)' : 'var(--color-red)')};
`;

const InputGrayStyled = styled(InputStyled)`
  border-width: 1px;
  border-color: ${({ valid }) => (valid ? 'rgba(255,255,255,0.3)' : 'var(--color-red)')};
`;

const InputAmountStyled = styled(InputGrayStyled)<{ pallete: string }>`
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0.34px;
  color: ${({ pallete }) => `var(--color-${pallete})`};
`;

const InputProposalStyled = styled(InputGrayStyled)<InputProps>`
  font-family: 'SF Pro Display', sans-serif;
  font-size: 14px;
  line-height: 17px;
  font-weight: 400;
  font-style: normal;
  color: ${({ pallete }) => `var(--color-${pallete})`};
  height: 45px;
  background-color: ${({ valid }) => (valid ? 'rgba(255, 255, 255, .05)' : 'rgb(255, 116, 107, .15)')};
  border: 1px solid rgba(255, 255, 255, 0.5);
  padding: 0 15px;
  border-radius: 10px;

  &::placeholder {
    font-size: 16px;
    font-style: italic;
  }
`;
const InputMainStyled = styled(InputGrayStyled)<InputProps>`
  font-size: 16px;
  font-weight: normal;
  color: ${({ pallete, valid }) => (valid ? `var(--color-${pallete})` : 'rgba(255, 98, 92, 1)')};
  height: 45px;
  background-color: ${({ valid }) => (valid ? 'rgba(255, 255, 255, .05)' : 'rgba(255, 98, 92, 0.2)')};
  padding: 0 15px;
  border-radius: 10px;
  border: none;

  &::placeholder {
    font-size: 16px;
  }
`;

const menuEyeStyle = css`
  position: absolute;
  z-index: 3;
  top: 12px;
  right: 12px;
  margin: 0;
`;
const LabelStyled = styled.div<InputProps>`
  text-align: start;
  margin-bottom: 10px;
  font-family: 'SFProDisplay';
  font-size: 14px;
  color: 'rgba(255, 255, 255, .6)';
`;

const InfoStyled = styled.div<InputProps>`
  text-align: start;
  margin-top: 6px;
  margin-left: 15px;
  font-family: 'SFProDisplay';
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
`;

const ErrorStyled = styled.div<InputProps>`
  text-align: start;
  margin-top: 6px;
  margin-left: 15px;
  font-family: 'SFProDisplay';
  font-size: 14px;
  height: 16px;
  color: ${({ pallete, valid }) => (valid ? `var(--color-${pallete})` : 'rgba(255, 98, 92, 1)')};
`;

const IconContainer = styled.div`
 position: absolute;
 right: 0;
 padding-top: 15px;
 padding-right: 15px;
`;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({
    label, valid = true, variant = 'regular', margin = 'none', pallete, className, errorMessage, children, ...rest
  }, ref) => {
    const InputComponent = {
      regular: InputRegularStyled,
      gray: InputGrayStyled,
      proposal: InputProposalStyled,
      icon: InputRegularStyled,
      modalInput: InputMainStyled,
    }[variant];

    const [inputVisible, setInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState(rest.value ?? '');

    const inputHandler = (e) => {
      if (rest?.onChange) rest?.onChange(e);
      setInputValue(e.target.value);
    };

    return (
      <ContainerStyled className={className} margin={margin}>
        {!!label && <LabelStyled valid={valid}>{label}</LabelStyled>}
        {
              !!children && (
              <IconContainer>
                { children }
              </IconContainer>
              )
          }
        <InputComponent
          ref={ref}
          valid={valid}
          pallete={pallete}
          {...rest}
          type={inputVisible ? 'text' : rest.type}
          className={!valid ? 'invalid' : ''}
          onChange={inputHandler}
        />
        <ErrorStyled>{!valid ? errorMessage : ''}</ErrorStyled>
      </ContainerStyled>
    );
  },
);

export default Input;
