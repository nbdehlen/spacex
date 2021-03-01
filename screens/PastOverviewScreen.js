import React from "react"
import { useQuery } from "react-apollo"
import { Text, View } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import LaunchesItem from "../components/LaunchesItem"
import { FETCH_PREVIOUS_LAUNCHES } from "../queries"

const PastOverviewScreen = () => {
  const { data, error, loading } = useQuery(FETCH_PREVIOUS_LAUNCHES)

  //TODO: add centered spinner
  if (loading) return <Text>"Loading..."</Text>
  //TODO: red text errro msg
  if (error) return <Text>{`Error! ${error.message}`}</Text>

  return (
    <View>
      <Text>past overview screen</Text>
      <FlatList
        data={data.launchesPast}
        renderItem={({ item }) => {
          // {
          //   console.log(item)
          // }
          return <LaunchesItem props={{ ...item }} />
        }}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  )
}

export default PastOverviewScreen
