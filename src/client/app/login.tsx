import * as React from 'react'
import { Fragment } from 'react'
import Common from './interfaces'
import * as Rx from 'rxjs'
import { Helmet } from 'react-helmet'
import { ApolloClient, NormalizedCacheObject } from 'apollo-boost'
import {
  Button,
  Jumbotron
} from 'reactstrap'

namespace Login {
  export interface Props {
    modelObservable: Rx.BehaviorSubject<Common.Model>
    client: ApolloClient<NormalizedCacheObject>
  }
  export interface State {
    model: Common.Model,
  }
  export class Component extends React.Component<Props, State> {
    constructor (props: Props) {
      super(props)
      props.modelObservable
        .subscribe((model) => {
          this.setState({ model })
        })
    }
    // onResponse (response) {
    //   if (response.status === 'PARTIALLY_AUTHENTICATED') {
    //     this.props.client.query({
    //       query: token,
    //       variables: { params: { token: response.code } }
    //     })
    //       .then(
    //         response => {
    //           this.props.onToken(response.data.getAccessToken.token)
    //         }
    //       )
    //       .catch((error) => {
    //         this.setState({ error })
    //       })
    //   }
    // }
    render () {
      return (
        <Fragment>
          <Jumbotron>
            <Helmet>
              <title>Login</title>
            </Helmet>
            <h1 className='display-3'>Welcome</h1>
            <p className='lead'>To login please use the phone number associate with your account.</p>
            <hr className='my-2' />
            <p>In case you were no added as an account manager yet, please send an email to patrick@m-tribes.com</p>
            <Button color='primary' size='lg'>Login with phone number</Button>
            <Button color='primary' size='lg'>Login with email</Button>
            {/* <AccountKit
              csrf={this.props.csrf}
              onResponse={this.onResponse}
              appId='549120595452285'
              version='v1.1'
              countryCode='+49'>
              {p => 
            </AccountKit> */}
          </Jumbotron>
        </Fragment>
      )
    }
  }
}

export default Login.Component
