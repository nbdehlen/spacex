import React from "react"
import { Dimensions } from "react-native"
import styled from "styled-components/native"
import ccolors from "./colors.json"

export const deviceWidth = Dimensions.get("window").width
export const deviceHeight = Dimensions.get("window").height

export const colors = ccolors

export const Row = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
export const Card = styled.View`
  background-color: ${colors.primary.color};
  border-radius: 16px;
  padding: 20px;
  margin: 32px 32px 32px 32px;
`
export const Fail = styled.Text`
  font-weight: bold;
  font-size: 18px;
  color: ${colors.fail};
`
export const ErrorText = styled.Text`
  font-weight: bold;
  font-size: 18px;
  color: ${colors.error};
`
export const Success = styled.Text`
  font-weight: bold;
  font-size: 18px;
  color: ${colors.success};
`
export const BaseText = styled.Text`
  font-size: 18px;
  color: ${colors.primary.onColor};
`
export const Container = styled.View`
  /* margin: 32px 32px 32px 32px; */
  background-color: ${colors.dark};
`
export const ImageWrapper = styled.View`
  justify-content: center;
  height: 200px;
  width: 100%;
`
const SpacerView = styled.View`
  ${({ h }) => h && `height:${h}px;`}
  ${({ w }) => w && `width:${w}px;`}
`
export const Spacer = ({ h, w }) => <SpacerView h={h} w={w} />
