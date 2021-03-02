import React, { useEffect, useRef, useState } from "react"
import { useLazyQuery, useQuery } from "react-apollo"
import { ActivityIndicator, ImageBackground, Text, View } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import LaunchesItem from "../components/LaunchesItem"
import ActivitySpinner from "../components/ActivitySpinner"
import ErrorMessage from "../components/ErrorMessage"
import { FETCH_PREVIOUS_LAUNCHES } from "../queries"
import { Container } from "../theme/base"
import firebaseConnection from "../firebase/firebaseConnection"
// import { FlatList } from "@stream-io/flat-list-mvcp"

const PastOverviewScreen = () => {
  const [offset, setOffset] = useState(0)
  // const { data, error, loading, refetch } = useQuery(FETCH_PREVIOUS_LAUNCHES, {
  //   variables: { offset },
  // })
  const [fetchData, { data, error, refetch, loading }] = useLazyQuery(
    FETCH_PREVIOUS_LAUNCHES,
    {
      variables: { offset },
    }
  )
  const [likes, setLikes] = useState({})
  const [displayError, setDisplayError] = useState()
  const [sorted, setSorted] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  // const fetchPreviousLaunches = (offset) => {
  //   const { loading, error, data } = useQuery(FETCH_PREVIOUS_LAUNCHES, {
  //     variables: { offset },
  //   })

  // }
  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (data) {
      const sortedData = data.launchesPast.sort(
        (a, b) => new Date(b.launch_date_local) - new Date(a.launch_date_local)
      )
      setSorted([...sorted, ...sortedData])
    }
  }, [data])

  /**
   * eslint config
   * load more on scroll down
   * sort data
   * details page
   *    styling
   *    api call
   *    joining data sources?
   */

  useEffect(() => {
    firebaseConnection
      .collection("launches")
      .doc("likes")
      .onSnapshot((querySnapshot) => {
        if (querySnapshot?.data()) {
          setLikes(querySnapshot.data())
        }
      })
  }, [])

  const handleRefresh = () => {
    console.log("inRefresh")
    setOffset((prevState) => prevState + 10)
    refetch(10)
    // setRefreshing(false)
  }
  //TODO: error state and for firestore
  if (loading) {
    return <ActivitySpinner />
  }
  //TODO: red text errro msg
  if (error) {
    return <ErrorMessage message={error.message} />
  }

  return (
    <Container>
      <ImageBackground
        source={require("../assets/space.png")}
        style={{ width: "100%", height: "100%" }}
        imageStyle={{ resizeMode: "repeat" }}
      >
        {likes && sorted && (
          <FlatList
            data={sorted}
            renderItem={({ item }) => {
              const like = likes[item.id] ? likes[item.id] : 0
              return <LaunchesItem props={{ like, ...item }} />
            }}
            keyExtractor={(item) => item.id.toString()}
            // refreshing={refreshing}
            // onRefresh={handleRefresh}
            // onEndReachedThreshold={0.2}
            onEndReached={handleRefresh}
            // initialScrollIndex={5}
            // getItemLayout={(data, index)}
          />
        )}
      </ImageBackground>
    </Container>
  )
}

export default PastOverviewScreen
