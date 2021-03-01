import styled from "styled-components"
import colors from "./colors.json"

export const Row = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
export const Card = styled.View`
  background-color: ${colors.dark};
  border-radius: 16px;
  padding: 16px 16px 8px 16px;
  margin: 24px 32px 0px 32px;
`
export const Fail = styled.Text`
  font-weight: bold;
  color: ${colors.fail};
`

export const Success = styled.Text`
  font-weight: bold;
  color: ${colors.success};
`
