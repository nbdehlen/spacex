import { useNavigation } from "@react-navigation/native"
import React, { useEffect, useLayoutEffect, useState } from "react"
import { useQuery } from "react-apollo"
import { Text, View } from "react-native"
import ErrorMessage from "../components/ErrorMessage"
import ActivitySpinner from "../components/ActivitySpinner"
import { Button } from "../components/Button"
import stackConfig from "../Navigation/stackConfig"
import { FETCH_DETAILS } from "../queries"
import { Container, Row } from "../theme/base"
import firebaseConnection from "../firebase/firebaseConnection"

const PastDetailsScreen = ({ route: { params } }) => {
  const { data, error, loading } = useQuery(FETCH_DETAILS, {
    variables: { id: params.id },
  })
  const navigation = useNavigation()
  const [updatedLike, setUpdatedLike] = useState(params.like)
  const [displayError, setDispayError] = useState("")

  useLayoutEffect(() => {
    navigation.setOptions({
      title: params.mission_name,
      headerTitleStyle: {
        ...stackConfig.headerTitleStyle,
        marginRight: 60,
      },
    })
  }, [navigation])

  const getUpdatedLike = () => {
    firebaseConnection
      .collection("launches")
      .doc("likes")
      .get()
      .then((doc) => {
        if (doc.exists) {
          const response = doc.data()
          setUpdatedLike(response[params.id])
        } else {
          setDisplayError("No such document!")
        }
      })
      .catch((error) => {
        setDisplayError("Error getting document:", error)
      })
  }

  const handleLike = () => {
    params.likeMission()
    getUpdatedLike()
  }

  /**
   * Image carousel or slider
   * modal for details?
   */

  if (loading) {
    return <ActivitySpinner />
  }

  if (error) {
    setDispayError(error.message)
  }

  displayError && <ErrorMessage message={error.message} />

  return (
    <Container>
      <Row style={{ justifyContent: "flex-end" }}>
        <Button title={updatedLike} onPress={handleLike} />
      </Row>
    </Container>
  )
}

export default PastDetailsScreen
