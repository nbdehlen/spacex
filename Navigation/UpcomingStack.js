import React from "react"
import UpcomingDetailsScreen from "../screens/UpcomingDetailsScreen"
import UpcomingOverviewScreen from "../screens/UpcomingOverviewScreen"
import { createStackNavigator } from "@react-navigation/stack"
import stackConfig from "./stackConfig"

const Stack = createStackNavigator()

const UpcomingStack = () => {
  return (
    <Stack.Navigator screenOptions={stackConfig}>
      <Stack.Screen
        name="UpcomingOverview"
        component={UpcomingOverviewScreen}
      />

      <Stack.Screen name="UpcomingDetails" component={UpcomingDetailsScreen} />
    </Stack.Navigator>
  )
}

export default UpcomingStack
