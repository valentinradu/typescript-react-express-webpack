import { split } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { ApolloClient } from 'apollo-boost'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { getMainDefinition } from 'apollo-utilities'

const httpLink = new HttpLink({
  uri: 'http://104.199.19.55/graphql',
  // uri: 'http://localhost:8080/graphql'
})

const cache = new InMemoryCache()

const wsLink = new WebSocketLink({
  uri: `ws://104.199.19.55/subscriptions`,
  // uri: 'ws://localhost:8080/subscriptions',
  options: {
    reconnect: true
  }
})

// Using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const def = getMainDefinition(query)
    return def.kind === 'OperationDefinition' && def.operation === 'subscription'
  },
  wsLink,
  httpLink
)

export default new ApolloClient({ link, cache })
