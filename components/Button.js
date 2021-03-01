import React from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { BaseText, colors } from "../theme/base"

export const Button = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          borderColor: colors.primary.onColor,
          borderWidth: 1,
          borderRadius: 8,
          paddingHorizontal: 12,
          paddingVertical: 8,
        }}
      >
        <BaseText>{title}</BaseText>
      </View>
    </TouchableOpacity>
  )
}
