import { useNavigation } from "@react-navigation/native"
import React, { useLayoutEffect, useState } from "react"
import { useQuery } from "react-apollo"
import { Modal, View, TouchableOpacity, Linking, Image } from "react-native"
import ErrorMessage from "../components/ErrorMessage"
import ActivitySpinner from "../components/ActivitySpinner"
import { Button } from "../components/Button"
import stackConfig from "../Navigation/stackConfig"
import { FETCH_DETAILS } from "../queries"
import {
  BaseText,
  colors,
  Container,
  Fail,
  ImageWrapper,
  Row,
  Spacer,
  Success,
  deviceWidth,
} from "../theme/base"
import firebaseConnection from "../firebase/firebaseConnection"
import Carousel from "react-native-snap-carousel"

const PastDetailsScreen = ({ route: { params } }) => {
  const { data, error, loading } = useQuery(FETCH_DETAILS, {
    variables: { id: params.id },
  })
  const navigation = useNavigation()
  const [updatedLike, setUpdatedLike] = useState(params.like)
  const [displayError, setDispayError] = useState("")
  const [modalVisible, setModalVisible] = useState(false)

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

  const handleModal = () => {
    setModalVisible((prevState) => !prevState)
  }

  const goToWikiLink = () => {
    Linking.openURL(data.launch?.links?.wikipedia)
  }

  const goToYouTubeLink = () => {
    Linking.openURL(data.launch?.links?.video_link)
  }
  /**
   * Image carousel or slider
   */

  if (error) {
    setDispayError(error.message)
  }

  if (loading) {
    return <ActivitySpinner />
  }

  if (displayError) {
    return <ErrorMessage message={displayError} />
  }

  data && console.log(data)

  const renderItem = ({ item, index }) => {
    console.log(item)
    return (
      <ImageWrapper style={{ height: 250 }}>
        <Image
          source={{ uri: item }}
          style={{
            flex: 1,
            width: null,
            height: null,
            resizeMode: "contain",
            borderRadius: 8,
          }}
        />
      </ImageWrapper>
    )
  }

  return (
    <Container style={{ flex: 1 }}>
      {/* <View style={{ flex: 1, margin: 32 }}> */}
      <Spacer h={20} />
      {data.launch?.links?.flickr_images && (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Carousel
            layout={"default"}
            data={data.launch?.links?.flickr_images}
            sliderWidth={deviceWidth - 40}
            itemWidth={deviceWidth - 40}
            renderItem={renderItem}
            autoplay={true}
            autoplayDelay={2500}
            autoplayInterval={4000}
            enableMomentum={false}
            lockScrollWhileSnapping={true}
          />
        </View>
      )}
      <Spacer h={20} />
      {/* <View style={{ flex: 1, alignItems: "center" }}> */}
      <View style={{ flex: 1, marginHorizontal: 20 }}>
        <Modal visible={modalVisible} transparent={true} animationType="slide">
          <TouchableOpacity
            onPress={handleModal}
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.6)",
            }}
          >
            <View
              style={{
                elevation: 5,
                backgroundColor: colors.dark,
                justifyContent: "center",
                alignItems: "center",
                width: "80%",
                height: "80%",
              }}
            >
              <BaseText>{data.launch?.details}</BaseText>
            </View>
          </TouchableOpacity>
        </Modal>

        <View>
          <BaseText style={{ height: 24 }}>
            Rocket: {data.launch?.rocket?.rocket_name}
          </BaseText>
          <BaseText style={{ height: 24 }}>
            Rocket type: {data.launch?.rocket?.__typename}
          </BaseText>
          <BaseText style={{ height: 24 }}>
            Reused:{" "}
            {data.launch?.rocket?.fairings?.reused ? (
              <Success>Yes</Success>
            ) : (
              <Fail>No</Fail>
            )}
          </BaseText>
          <BaseText style={{ height: 36 }}>
            Recovered:{" "}
            {data.launch?.rocket?.fairings?.recovered ? (
              <Success>Yes</Success>
            ) : (
              <Fail>No</Fail>
            )}
          </BaseText>
          <BaseText
            style={{
              color: colors.accent_1,
              height: 36,
            }}
            onPress={goToWikiLink}
          >
            Wikipedia link
          </BaseText>
          <BaseText
            style={{ color: colors.accent_1, height: 36 }}
            onPress={goToYouTubeLink}
          >
            YouTube link
          </BaseText>
        </View>
      </View>
      <Row
        style={{
          justifyContent: "center",
          paddingBottom: 16,
          marginRight: 16,
        }}
      >
        <Button title="Mission summary" onPress={handleModal} />
        <View style={{ position: "absolute", right: 0 }}>
          <Button title={updatedLike} onPress={handleLike} />
        </View>
      </Row>
    </Container>
  )
}

export default PastDetailsScreen
