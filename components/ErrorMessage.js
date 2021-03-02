import React from "react"
import { View } from "react-native"
import { ErrorText } from "../theme/base"

export const ErrorMessage = ({ message = "An unknown error has occured." }) => {
  console.log(message)
  return (
    <View style={{ alignItems: "center", height: 20 }}>
      <ErrorText>Error! {message}</ErrorText>
    </View>
  )
}

export default ErrorMessage
