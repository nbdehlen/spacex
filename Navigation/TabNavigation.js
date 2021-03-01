import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import React from "react"
import { colors } from "../theme/base"
import PastStack from "./PastStack"
import UpcomingStack from "./UpcomingStack"

const Tab = createBottomTabNavigator()

const TabNavigation = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        keyboardHidesTabBar: true,
        style: {
          height: 53,
          backgroundColor: colors.dark_2,
          paddingTop: 6,
          paddingBottom: 2,
          borderTopWidth: 0,
        },
        labelStyle: {
          fontSize: 14,
        },
        inactiveTintColor: colors.primary.onColor,
        activeTintColor: "#007bff",
      }}
    >
      <Tab.Screen name="Past" component={PastStack} />
      <Tab.Screen name="Upcoming" component={UpcomingStack} />
    </Tab.Navigator>
  )
}

export default TabNavigation
