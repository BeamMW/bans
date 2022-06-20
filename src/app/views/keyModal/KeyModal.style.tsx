import styled from "styled-components"

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #fff;
`

export const Content = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
`
export const Controls = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: row;

  & > *:not(:first-child) {
  margin-left: 30px;
  }
`

export const CloseText = styled.span`
  font-weight: bold;
  margin-left: 9px;
`

export const CopyText = styled(CloseText)`
  color: rgb(3, 46, 73);
`
