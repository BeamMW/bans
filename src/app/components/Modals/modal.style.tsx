import styled from 'styled-components';
interface ModalContentProps {
  width: string;
}
export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: fixed;
  top: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  background-color: var(--color-dark-transparent);
  user-select:none;
`;

export const ModalContent = styled.div`
    padding: 40px;
    min-width: ${({ width }) => width ? width : '630px' };
    max-width: 761px;
    width: ${({ width }) => width ? width : 'auto' };
    border-radius: 10px;
    background-color: #00446F;
`;

export const ModalHeader = styled.p`
    font-family: 'SFProDisplay';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 21px;
    text-align: center;
    color: #FFFFFF;
    text-align: center;
    margin-bottom: 20px;
`

export const SubHeader = styled.p`
    font-family: 'SFProDisplay';
    font-style: italic;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    text-align: center;
    color: rgba(255,255,255,0.7);
    max-width: 589px;
`