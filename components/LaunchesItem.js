import { useNavigation } from "@react-navigation/native"
import { format } from "date-fns"
import React from "react"
import { Image, Text, View } from "react-native"
import { dbh } from "../firebase/firebaseConnection"
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

const LaunchesItem = ({
  // props: {
  //   mission_name,
  //   launch_date_local,
  //   launch_success,
  //   links: { mission_patch_small, mission_patch },
  // },
  props,
}) => {
  const navigation = useNavigation()

  const goToDetails = () => {
    navigation.navigate("PastDetails", { ...props })
  }

  const {
    like,
    id,
    mission_name,
    launch_date_local,
    launch_success,
    links: { mission_patch_small, mission_patch },
  } = props

  const imageWithFallback = mission_patch_small
    ? { uri: mission_patch_small }
    : require("../assets/ufo.png")

  const likeMission = () => {
    dbh
      .collection("launches")
      .doc("likes")
      .update({
        [id]: like + 1,
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
