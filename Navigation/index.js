import { NavigationContainer } from "@react-navigation/native"
import apolloClient from "../apolloClient"
import { ApolloProvider } from "react-apollo"
import TabNavigation from "./TabNavigation"
import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

const RootNavigator = () => {
  const client = apolloClient()
  const Stack = createStackNavigator()
  return (
    <ApolloProvider client={client}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Root" component={TabNavigation} />
      </Stack.Navigator>
    </ApolloProvider>
  )
}

const Navigation = () => (
  <NavigationContainer>
    <RootNavigator />
  </NavigationContainer>
)

export default Navigation
