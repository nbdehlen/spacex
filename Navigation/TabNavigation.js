import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import React from "react"
import PastStack from "./PastStack"
import UpcomingStack from "./UpcomingStack"

const Tab = createBottomTabNavigator()

const TabNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Past" component={PastStack} />
      <Tab.Screen name="Upcoming" component={UpcomingStack} />
    </Tab.Navigator>
  )
}

export default TabNavigation
