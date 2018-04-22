import gql from 'graphql-tag'
import Common from '../interfaces'
import Fragments from './fragments'

export namespace Orders {
  export namespace Subscribe {
    export const query = gql`
      subscription order($params: TrackOrderInput!) {
        trackOrder(params: $params) {
          ...Dashboard
        }
      }
      ${Fragments.Order.dashboard}
    `
    export type Response = {
      order: Common.Order
    }
    export type Variables = {
      params: {
        token: string,
        filtering?: Common.OrderFilter
      }
    }
  }
  export namespace Register {
    export const query = gql`
      mutation order($params: RegisterOrderInput!){
        registerOrder(params: $params) {
          ...Dashboard
        }
      }
      ${Fragments.Order.dashboard}
    `
    export type Response = {
      order: Common.Order
    }
    export type Variables = {
      params: {
        token: string,
        category: Common.OrderCategory,
        pickup: Common.Location,
        dropoff: Common.Location,
        pickupAddress: Common.Address,
        dropoffAddress: Common.Address,
        scheduledDate?: string,
        recipientFirstName?: string,
        recipientLastName?: string,
        recipientPhoneNumber?: string
      }
    }
  }
  export namespace Get {
    export const query = gql`
      query orders($params: GetOrdersInput!) {
        getOrders(params: $params) {
          ...Dashboard
        }
      }
      ${Fragments.Order.dashboard}
    }`
    export type Response = {
      orders: [Common.Order]
    }
    export type Variables = {
      params: {
        token: string,
        filtering?: Common.OrderFilter
      }
    }
  }
}