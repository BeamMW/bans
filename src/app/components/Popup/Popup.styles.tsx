import styled from "styled-components";
import Utils from "../../library/base/utils";

interface ContainerStyleProps {
  isVisible: boolean;
}

export const Container = styled.div<ContainerStyleProps>`
    border-radius: 10px;
    z-index:  999;
    position: absolute;
    outline:  none;
    padding:  10px 20px;
    background-color: ${Utils.getStyles().background_popup};
    display: ${props => (props.isVisible ? "block" : "none")};
    right: 10px;
`

export const PopupItem = styled.div`
      color: #fff;
      padding: 6px 0;
      cursor: pointer;
      display: flex;
      align-items: center;
      line-height: normal !important;
      white-space: nowrap;
      z-index: 999;
      position: relative;
      &:hover {
        color: #00f6d2;
      }

      & > svg {
        margin-right: 10px
      }
`

export const BluredContainer = styled.div `
    right: 0px;
    position: absolute;
    border-radius: 10px;
    padding:  10px 20px;
    backdrop-filter: blur(30px);
    background-color: ${Utils.getStyles().background_popup};
    width: 100%;
    height: 100%;
    margin-top: -10px;
`
