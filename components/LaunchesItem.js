import React from "react"
import { Text, View } from "react-native"
import { Card, Fail, Row, Success } from "../theme/base"

const LaunchesItem = ({
  props: { mission_name, launch_date_local, launch_success },
}) => {
  return (
    <Card>
      <Row>
        <Text>Mission:</Text>
        <Text>{mission_name}</Text>
      </Row>
      <Text>{launch_date_local}</Text>
      <View style={{ alignItems: "flex-end" }}>
        {launch_success ? <Success>Success</Success> : <Fail>Fail</Fail>}
      </View>
    </Card>
  )
}

export default LaunchesItem
