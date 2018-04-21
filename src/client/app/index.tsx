import * as React from 'react'
import { Fragment } from 'react'
import { ApolloProvider } from 'react-apollo'
import client from './apollo-client'
import App from './app'
import * as Rx from 'rxjs'
import * as moment from 'moment'
import { orderResourcesMap } from './order-resources-map'
import Common from './interfaces'
import * as uuid from 'uuid'
import { get as getCookie } from 'es-cookie'

namespace Index {
  export interface Props {
  }
  export interface State {
    modelObservable: Rx.BehaviorSubject<Common.Model>
  }
  export class Component extends React.Component<Props, State> {
    constructor(props: Props) {
      super(props)
      const start = moment().startOf('day').toString()
      const end = moment().endOf('day').toString()
      const model: Common.Model = {
        token: getCookie('token'),
        ordersFilter: {
          statuses: [Common.OrderStatus.pendingProvider, 
                     Common.OrderStatus.done, 
                     Common.OrderStatus.cancelled,
                     Common.OrderStatus.pendingDropoff
                    ],
          dateRange: {
            start: start,
            end: end
          }
        },
        csrf: uuid.v4(), // Totally useless right now since we're not checking this on server
        orderResourcesMap
      }
      this.setState({
        modelObservable: new Rx.BehaviorSubject(model)
      })
    }
    render () {
      return (
        <Fragment>
          <style>{`
            html,body {
              width:100%;
              height:100%;
            }
            body {
              background-color: #f7f7f7;
            }
            ul.react-datepicker__time-list {
              padding-left: 0;
              padding-right: 0;
            }
          `}</style>
  
          <ApolloProvider client={client}>
            <App modelObservable={this.state.modelObservable} client={client}/>
          </ApolloProvider>
        </Fragment>
      )
    }
  }
}


export default Index.Component