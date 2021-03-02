import { useNavigation } from "@react-navigation/native"
import React, { useLayoutEffect } from "react"
import { useQuery } from "react-apollo"
import { Text, View } from "react-native"
import stackConfig from "../Navigation/stackConfig"
import { Container } from "../theme/base"
const PastDetailsScreen = ({ route: { params } }) => {
  // const PastDetailsScreen = ({ route:{params: {}}}) => {
  // const { data, error, loading } = useQuery(FETCH_PREVIOUS_LAUNCHES)
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
  }, [navigation])

  //TODO: add centered spinner
  // if (loading) return <Text>"Loading..."</Text>
  //TODO: red text errro msg
  // if (error) return <Text>{`Error! ${error.message}`}</Text>

  return (
    <Container>
      <Text>sfgdsdffds</Text>
    </Container>
  )
}

export default PastDetailsScreen
