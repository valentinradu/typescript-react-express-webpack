import gql from 'graphql-tag'

namespace Fragments {
  export namespace User {
    export const dashboard = gql`
      fragment Dashboard on Order {
        id
        role
        location {
          lon
          lat
        }
        company {
          name
          address {
            street
            zipNo
            city
            country
          }
        }
      }
    `
  }
  export namespace Order {
    export const dashboard = gql`
      fragment Dashboard on Order {
        id
        status
        provider {
          firstName
          lastName
          location {
            lon
            lat
          }
        }
        pickup {
          lon
          lat
        }
        dropoff {
          lon
          lat
        }
        addedDate
      }
    `
  }
}

export default Fragments