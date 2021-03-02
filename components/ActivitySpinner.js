import React from "react"
import { ActivityIndicator, View } from "react-native"

const ActivitySpinner = () => {
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator />
    </View>
  )
}

export default ActivitySpinner
