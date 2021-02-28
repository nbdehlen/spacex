import { HttpLink } from "apollo-link-http"
import { ApolloClient } from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"

const apolloClient = () => {
  const link = new HttpLink({
    uri: "https://api.spacex.land/graphql/",
  })
  const cache = new InMemoryCache()
  const client = new ApolloClient({
    link,
    cache,
  })
  return client
}

export default apolloClient
