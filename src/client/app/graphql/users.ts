import gql from 'graphql-tag'
import Common from '../interfaces'
import Fragments from './fragments'

export namespace Users {
  export namespace Register {
    export const query = gql`
      mutation user($params: RegisterUserInput!){
        registerUser(params: $params) {
          ...Dashboard
        }
      }
      ${Fragments.User.dashboard}
    `
    export type Response = {
      user: Common.User
    }
    export type Variables = {
      token: string,
      firstName: string,
      lastName: string,
      role: Common.Role,
      phoneNumber?: string
      email?: string
    }
  }
  export namespace Update {
    export const query = gql`
      mutation user($params: UpdateUserInput!) {
        updateUser(params: $params) {
          ...Dashboard
        }
      }
      ${Fragments.User.dashboard}
    `
    export type Response = {
      user: Common.User
    }
    export type Variables = {
      token: string,
      iban?: string,
      company?: Common.Company
      status: Common.AccountStatus,
      location?: Common.Location,
      id?: string
    }
  }
  export namespace Get {
    export const query = gql`
      query user($params: GetUserInput!) {
        getUser(params: $params) {
          ...Dashboard
        }
      }
      ${Fragments.User.dashboard}
    }`
    export type Response = {
      user: Common.User
    }
    export type Variables = {
      token: string,
    }
  }
}

export namespace Token {
  export namespace Get {
    export const query = gql`
      query token($params: GetAccessTokenInput!) {
        getAccessToken(params: $params) {
          token
        }
      }
    }`
    export type Response = {
      user: string
    }
    export type Variables = {
      token: string
    }
  }
}