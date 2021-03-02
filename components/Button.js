import React from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { BaseText, colors } from "../theme/base"

export const Button = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          borderColor: colors.primary.onColor,
          backgroundColor: "#007bff",
          // borderBottomWidth: 1,
          // borderColor: "#007bff",
          borderRadius: 12,
          paddingHorizontal: 16,
          paddingVertical: 10,
        }}
      >
        <BaseText>{title}</BaseText>
      </View>
    </TouchableOpacity>
  )
}
