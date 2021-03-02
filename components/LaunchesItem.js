import { useNavigation } from "@react-navigation/native"
import { format } from "date-fns"
import React, { useRef } from "react"
import { Image, Text, View } from "react-native"
import firebaseConnection from "../firebase/firebaseConnection"
import {
  BaseText,
  Card,
  colors,
  Fail,
  ImageWrapper,
  Row,
  Spacer,
  Success,
} from "../theme/base"
import { Button } from "./Button"
import * as firebase from "firebase"
const LaunchesItem = ({ props }) => {
  const navigation = useNavigation()
  const increment = firebase.firestore.FieldValue.increment(1)

  const {
    like,
    id,
    mission_name,
    launch_date_local,
    launch_success,
    links: { mission_patch_small },
  } = props

  const goToDetails = () => {
    navigation.navigate("PastDetails", { likeMission, ...props })
  }
  const imageWithFallback = mission_patch_small
    ? { uri: mission_patch_small }
    : require("../assets/ufo.png")

  const likeMission = () => {
    firebaseConnection
      .collection("launches")
      .doc("likes")
      .update({
        [id]: increment,
      })
  }

  return (
    <Card>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 28,
            color: colors.primary.onColor,
            textAlign: "center",
          }}
        >
          {mission_name}
        </Text>
      </View>
      <Spacer h={20} />
      <ImageWrapper>
        <Image
          source={imageWithFallback}
          style={{
            flex: 1,
            width: null,
            height: null,
            resizeMode: "contain",
            borderRadius: 8,
          }}
        />
      </ImageWrapper>
      <Spacer h={20} />
      <Row>
        <BaseText style={{ fontSize: 14 }}>Launched at:</BaseText>
        <BaseText style={{ fontSize: 14 }}>Status:</BaseText>
      </Row>
      <Row>
        <BaseText style={{ fontWeight: "bold" }}>
          {format(new Date(launch_date_local), "HH:mm O dd MMM yyyy")}
        </BaseText>
        {launch_success ? <Success>Success</Success> : <Fail>Fail</Fail>}
      </Row>
      <Spacer h={40} />
      <Row style={{ justifyContent: "center" }}>
        <Button title="Mission details" onPress={goToDetails} />
      </Row>
      <Row style={{ justifyContent: "flex-end" }}>
        <Button title={like} onPress={likeMission} />
      </Row>
    </Card>
  )
}

export default LaunchesItem
