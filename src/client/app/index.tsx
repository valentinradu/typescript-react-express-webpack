import * as React from 'react'
import { Fragment } from 'react'
import * as ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import client from './apollo-client'
import App from './app'
import * as Rx from 'rxjs'
import * as moment from 'moment'
import { orderResourcesMap } from './order-resources-map'
import Common from './interfaces'
import { get as getCookie } from 'es-cookie'
import { Helmet } from 'react-helmet'
import * as firebase from 'firebase'
import {
  Button,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody
} from 'reactstrap'

namespace Index {
  export interface Props {
  }
  export interface State {
    modelObservable: Rx.BehaviorSubject<Common.Model>
    error?: Error
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
        orderResourcesMap
      }
      this.state = { 
        modelObservable: new Rx.BehaviorSubject(model)
      }
      var config = {
        apiKey: 'AIzaSyAKWwTfmNE3_KwzCO4qmcHDSEmXcVApNbI',
        authDomain: 'kinetic-bot-191809.firebaseapp.com',
        projectId: 'kinetic-bot-191809'
      };
      firebase.initializeApp(config);
    }
    componentDidCatch (error: Error, errorInfo: React.ErrorInfo) {
      this.state.modelObservable.error(error)
    }
    render () {
      return (
        <Fragment>
          <Helmet>
            <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css' />
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
          </Helmet>
          <Modal isOpen={Boolean(this.state.error)}>
            <ModalHeader>An error happened!</ModalHeader>
            <ModalBody>
              We sorry. We fix it. {this.state.error}
            </ModalBody>
            <ModalFooter>
              <Button color='primary'>
                Ok
              </Button>
            </ModalFooter>
          </Modal>
          <ApolloProvider client={client}>
            <App modelObservable={this.state.modelObservable} client={client}/>
          </ApolloProvider>
        </Fragment>
      )
    }
  }
}

ReactDOM.render(<Index.Component />, document.getElementById('app'))