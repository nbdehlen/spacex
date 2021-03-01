import React from "react"
import PastOverviewScreen from "../screens/PastOverviewScreen"
import PastDetailsScreen from "../screens/PastDetailsScreen"
import { createStackNavigator } from "@react-navigation/stack"
import stackConfig from "./stackConfig"

const Stack = createStackNavigator()

const PastStack = () => {
  return (
    <Stack.Navigator screenOptions={stackConfig}>
      <Stack.Screen
        name="PastOverview"
        component={PastOverviewScreen}
        options={{ title: "COMPLETED MISSIONS" }}
      />

      <Stack.Screen name="PastDetails" component={PastDetailsScreen} />
    </Stack.Navigator>
  )
}

export default PastStack
