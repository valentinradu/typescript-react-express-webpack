import * as React from 'react'
import Common from './interfaces'
import * as Rx from 'rxjs'
import { ApolloClient, NormalizedCacheObject } from 'apollo-boost'
// import Dashboard from './dashboard'
import Login from './login'
// import RegisterOrder from './register-order'

namespace App {
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
    render () {
      const { modelObservable, client } = this.props
      const { user } = this.state.model
      if (user) {
        if (user.role === Common.Role.patron) {
          // return <RegisterOrder modelObservable={this.props.modelObservable} />
          return <div />
        } else if (user.role === Common.Role.overseer) {
          // return <Dashboard modelObservable={this.props.modelObservable} />
          return <div />
        } else {
          return <p>{user.role} is not supported</p>
        }
      } else {
        return <Login modelObservable={modelObservable} client={client}/>
      }
    }
  }
}

export default App.Component
