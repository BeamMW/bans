import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    user-select: none;
    margin: 20px 0px;

    .slot {
      margin-left: auto;
      display: flex;
      align-items: center;
    }

    .tab-item {
      color: rgba(255, 255, 255, 0.3);
      font-size: 12px;
      font-weight: bold;
      cursor: pointer;

      .title {
        padding: 4px 16px;
        text-transform: uppercase;
      }
    }

    .tab-active {
      color: #fff;

      .bottom-line {
        height: 2px;
        width: 100%;
        box-shadow: 0 0 5px 0 rgba(0, 246, 210, 0.7);
        background-color: #00f6d2;
      }
    }
`