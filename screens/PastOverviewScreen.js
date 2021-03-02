import React, { useEffect, useState } from "react"
import { useLazyQuery } from "react-apollo"
import { ImageBackground } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import LaunchesItem from "../components/LaunchesItem"
import ActivitySpinner from "../components/ActivitySpinner"
import ErrorMessage from "../components/ErrorMessage"
import { FETCH_PREVIOUS_LAUNCHES } from "../queries"
import { Container } from "../theme/base"
import firebaseConnection from "../firebase/firebaseConnection"

const PastOverviewScreen = () => {
  const [fetchLaunches, { data, error, refetch, loading }] = useLazyQuery(
    FETCH_PREVIOUS_LAUNCHES,
    {
      variables: { offset },
    }
  )
  const [offset, setOffset] = useState(0)
  const [likes, setLikes] = useState({})
  const [displayError, setDisplayError] = useState("")
  const [sorted, setSorted] = useState([])

  useEffect(() => {
    firebaseConnection
      .collection("launches")
      .doc("likes")
      .onSnapshot(
        (querySnapshot) => {
          if (querySnapshot?.data()) {
            setLikes(querySnapshot.data())
          } else {
            setDisplayError("No such document!")
          }
        },
        (error) => setDisplayError(error.message)
      )
    fetchLaunches()
  }, [])

  useEffect(() => {
    if (data) {
      const sortedData = data.launchesPast.sort(
        (a, b) => new Date(b.launch_date_local) - new Date(a.launch_date_local)
      )
      setSorted([...sorted, ...sortedData])
    }
  }, [data])

  const handleRefresh = () => {
    console.log("inRefresh")
    setOffset((prevState) => prevState + 10)
    refetch(10)
  }

  if (error) {
    setDisplayError(error.message)
  }

  if (loading) {
    return <ActivitySpinner />
  }

  if (displayError) {
    return <ErrorMessage message={displayError} />
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
