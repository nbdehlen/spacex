import { useNavigation } from "@react-navigation/native"
import React, { useLayoutEffect } from "react"
import { Text, View } from "react-native"
import stackConfig from "../Navigation/stackConfig"
const PastDetailsScreen = ({ route: { params } }) => {
  // const PastDetailsScreen = ({ route:{params: {}}}) => {
  const navigation = useNavigation()
  console.log(params)

  useLayoutEffect(() => {
    navigation.setOptions({
      title: params.mission_name,
      headerTitleStyle: {
        ...stackConfig.headerTitleStyle,
        marginRight: 60,
      },
    })
  }, [])

  return (
    <View>
      <Text>sfgdsdffds</Text>
    </View>
  )
}

export default PastDetailsScreen
