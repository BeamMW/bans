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

      &:hover {
        color: #00f6d2;
      }

      & > svg {
        margin-right: 10px
      }
`