import { StatusBar } from "expo-status-bar"
import React from "react"
import { SafeAreaProvider } from "react-native-safe-area-context"
import Navigation from "./Navigation"

const App = () => (
  <SafeAreaProvider>
    <StatusBar style="auto" />
    <Navigation />
  </SafeAreaProvider>
)

export default App
