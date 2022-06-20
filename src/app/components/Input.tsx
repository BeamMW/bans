import React from 'react';
import styled from "styled-components"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  valid?: boolean;
  variant?: 'regular' | 'gray' | 'proposal' | 'icon';
  pallete?: 'purple' | 'blue' | 'white';
  margin?: 'none' | 'large';
  icon?: React.FC;

}

const ContainerStyled = styled.div<InputProps>`
  position: relative;
  min-height: 50px;
  max-width: 630px;
  margin-bottom: ${({ margin }) => (margin === 'none' ? 0 : 50)}px;
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

const InputProposalStyled = styled(InputGrayStyled)<{ pallete: string }>`
  font-size: 16px;
  font-weight: normal;
  color: ${({ pallete }) => `var(--color-${pallete})`};
  height: 45px;
  background-color: ${({ valid }) => (valid ? 'rgba(255, 255, 255, .05)' : 'rgb(255, 116, 107, .15)')};
  border: 1px solid rgba(255, 255, 255, 0.5);
  padding: 0 15px;
  border-radius: 10px;

  &::placeholder {
    font-size: 16px;
  }
`;

const LabelStyled = styled.div<InputProps>`
  text-align: start;
  margin-top: 4px;
  font-family: 'SFProDisplay';
  font-size: 14px;
  font-style: italic;
  color: ${({ valid }) => (valid ? 'rgba(255, 255, 255, .7)' : 'var(--color-red)')};
`;

const IconContainer = styled.div`
 position: absolute;
 right: 0;
 padding-top: 15px;
 padding-right: 15px;
`

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({
    label,
    valid = true,
    variant = 'regular',
    margin = 'none',
    pallete = 'blue',
    icon: IconComponent,
    className, ...rest
  }, ref) => {
    const InputComponent = {
      regular: InputRegularStyled,
      gray: InputGrayStyled,
      proposal: InputProposalStyled,
      icon: InputRegularStyled,
    }[variant];

    return (
      <ContainerStyled className={className} margin={margin}>
       {
       !!IconComponent && (
        <IconContainer>
          <IconComponent />
        </IconContainer>
       )
      }
        <InputComponent ref={ref} valid={valid} pallete={pallete} {...rest} />
        {!!label && <LabelStyled valid={valid}>{valid ? label : ''}</LabelStyled>}
      </ContainerStyled>
    );
  },
);

export default Input;
