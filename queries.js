import gql from "graphql-tag"

export const FETCH_PREVIOUS_LAUNCHES = gql`
  query GetLaunches($offset: Int) {
    launchesPast(limit: 10, offset: $offset) {
      id
      mission_name
      launch_date_local
      links {
        mission_patch_small
      }
      launch_success
    }
  }
`

export const FETCH_DETAILS = gql`
  query getDetails($id: ID!) {
    launch(id: $id) {
      details
      links {
        flickr_images
        wikipedia
        video_link
      }
      rocket {
        rocket_name
        fairings {
          recovered
          recovery_attempt
          reused
        }
      }
    }
  }
`
