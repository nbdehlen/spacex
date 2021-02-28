import React from "react"
import PastOverviewScreen from "../screens/PastOverviewScreen"
import PastDetailsScreen from "../screens/PastDetailsScreen"
import { createStackNavigator } from "@react-navigation/stack"

const Stack = createStackNavigator()

const PastStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PastOverview" component={PastOverviewScreen} />

      <Stack.Screen name="PastDetails" component={PastDetailsScreen} />
    </Stack.Navigator>
  )
}

export default PastStack
