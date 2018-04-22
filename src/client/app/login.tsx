import * as React from 'react'
import { Fragment } from 'react'
import Common from './interfaces'
import * as Rx from 'rxjs'
import { Helmet } from 'react-helmet'
import { ApolloClient, NormalizedCacheObject } from 'apollo-boost'
// import { Users } from './graphql/users'
import * as firebase from 'firebase'
import {
  Button,
  Jumbotron,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Input,
  Row
} from 'reactstrap'

namespace Login {
  export interface Props {
    modelObservable: Rx.BehaviorSubject<Common.Model>
    client: ApolloClient<NormalizedCacheObject>
  }
  export interface State {
    model: Common.Model,
    kind: Kind
    email?: string
    phone?: string
  }
  enum Kind {
    unknown,
    email,
    phone
  }
  export class Component extends React.Component<Props, State> {
    modelSubs?: Rx.Subscription
    recaptcha?: firebase.auth.RecaptchaVerifier
    constructor (props: Props) {
      super(props)
      this.state = { model: props.modelObservable.value, kind: Kind.unknown }
    }
    componentDidMount () {
      this.modelSubs = this.props.modelObservable
        .subscribe((model) => {
          this.setState({ model })
        })
    }
    componentWillUnmount () {
      if (this.modelSubs) {
        this.modelSubs.unsubscribe()
      }
    }
    componentDidUpdate () {
      if (this.state.kind != Kind.unknown && this.recaptcha == null) {
        this.recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha', {
          size: 'invisible'
        })
      }
    }
    withPhone () {
      if (this.state.phone && this.recaptcha) {
        this.handleToken(firebase.auth().signInWithPhoneNumber(this.state.phone, this.recaptcha))
      }
    }
    withEmail () {
      const settings = {
        url: window.location.href,
        handleCodeInApp: true
      }
      if (this.state.email) {
        this.handleToken(firebase.auth().sendSignInLinkToEmail(this.state.email, settings))
      }
    }
    handleToken (promise: Promise<void>) {
      return promise
      .then(() => {
        const user = firebase.auth().currentUser
        if (user) {
          return user.getIdToken(true)
        }
        else {
          throw new Error('User is not logged in')
        }
      })
      .then((token) => {
        let model = this.state.model
        model.token = token
        this.props.modelObservable.next(model)
      })
      .catch((error: Error) => {
        this.props.modelObservable.error(error)
      })
    }
    handleEmailInput (event: React.ChangeEvent<HTMLInputElement>) {
      this.setState({
        email: event.target.value
      })
    }
    handlePhoneInput (event: React.ChangeEvent<HTMLInputElement>) {
      this.setState({
        phone: event.target.value
      })
    }
    render () {
      type ModalInfo = [
        Common.UIMessage, 
        string | null, 
        Common.ChangeHandler<HTMLInputElement>,
        Common.MouseHandler<HTMLInputElement>
      ]
      const modalInfoMap = new Map<Kind, ModalInfo>()
      modalInfoMap[Kind.email] = [
        {title: 'Please insert your email'}, 
        this.state.email, 
        this.handleEmailInput.bind(this),
        this.withEmail.bind(this)
      ]
      modalInfoMap[Kind.phone] = [
        {title: 'Please insert your phone number'}, 
        this.state.phone, 
        this.handlePhoneInput.bind(this),
        this.withPhone.bind(this)
      ]
      const modalInfo = modalInfoMap[this.state.kind]
      return (
        <Fragment>
          {
            this.state.kind != Kind.unknown ?
            <Modal isOpen>
                <ModalHeader>{modalInfo[0].title}</ModalHeader>
                <ModalBody>
                <Input
                  value={modalInfo[1]}
                  onChange={modalInfo[2]} />
                <Row id='recaptcha'>
                </Row>
                </ModalBody>
                <ModalFooter>
                  <Button color='secondary' onClick={() => this.setState({kind: Kind.unknown})}>
                    Back
                  </Button>
                  <Button color='primary' onClick={modalInfo[3]}>
                    Login
                  </Button>
                </ModalFooter>
              </Modal> 
            : null
          }          
          <Jumbotron>
            <Helmet>
              <title>Login</title>
            </Helmet>
            <h1 className='display-3'>Welcome</h1>
            <p className='lead'>To login please use the phone number associate with your account.</p>
            <hr className='my-2' />
            <p>In case you were no added as an account manager yet, please send an email to patrick@m-tribes.com</p>
            <Button color='primary' size='lg' onClick={() => this.setState({kind: Kind.phone})}>
              Login with phone number
            </Button>
            <Button color='primary' size='lg' onClick={() => this.setState({kind: Kind.email})}>
              Login with email
            </Button>
          </Jumbotron>
        </Fragment>
      )
    }
  }
}

export default Login.Component