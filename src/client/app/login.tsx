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
  Form,
  FormGroup,
  Input
} from 'reactstrap'

namespace Login {
  export interface Props {
    modelObservable: Rx.BehaviorSubject<Common.Model>
    client: ApolloClient<NormalizedCacheObject>
  }
  export interface State {
    model: Common.Model,
    kind: Kind
    isCaptchaReady: boolean
  }
  enum Kind {
    unknown,
    email,
    phone
  }
  export class Component extends React.Component<Props, State> {
    modelSubs?: Rx.Subscription
    recaptchaRef = React.createRef<HTMLDivElement>()
    sendButtonRef?: HTMLButtonElement
    fieldInputRef?: HTMLInputElement
    constructor (props: Props) {
      super(props)
      this.state = { 
        model: props.modelObservable.value, 
        kind: Kind.unknown,
        isCaptchaReady: false
      }
    }
    componentDidMount () {
      this.modelSubs = this.props.modelObservable
        .subscribe((model) => { this.setState({ model }) })
    }
    componentWillUnmount () {
      if (this.modelSubs) {
        this.modelSubs.unsubscribe()
      }
    }
    handleModalOpen () {
      const captchaReady = Rx.Observable.create((observer: Rx.Observer<firebase.auth.RecaptchaVerifier>) => {
        const recaptchaVerifier = new firebase.auth.RecaptchaVerifier(this.recaptchaRef.current, {
          'size': 'normal',
          'callback': () => {
            this.setState({ isCaptchaReady: true })
            observer.next(recaptchaVerifier)
            observer.complete()
          }
        })
        recaptchaVerifier.render()
      }) as Rx.Observable<firebase.auth.RecaptchaVerifier>

      const inputValid = Rx.Observable.fromEvent<React.ChangeEvent<HTMLInputElement>>(this.fieldInputRef!, 'change')
      const sendPressed = Rx.Observable.fromEvent<React.MouseEvent<HTMLButtonElement>>(this.sendButtonRef!, 'click')
        .do((e) => e.preventDefault())
      
      Rx.Observable.combineLatest(captchaReady, inputValid, sendPressed)
        .flatMap(
          ([captcha, input, button]) => {
            if (input.target) {
              const value = input.target.value
              if (this.state.kind == Kind.phone) {
                const promise = firebase.auth().signInWithPhoneNumber(value, captcha)
                return Rx.Observable.fromPromise(promise)
              }
              else {
                const settings = {
                  url: window.location.href,
                  handleCodeInApp: true
                }
                const promise = firebase.auth().sendSignInLinkToEmail(value, settings)
                return Rx.Observable.fromPromise(promise)
              }
            }
            else {
              return Rx.Observable.empty()
            }
          }
        )
        .subscribe(
          () => {

          },
          (error) => {

          }
        )
  

      // 
      //     .then(this.handleToken)
      //     .catch((error: Error) => {
      //       console.log(error)
      //       this.props.modelObservable.error(error)
      //     })
      
      
      // this.setState({ isCaptchaReady: false })
      // 
      // if (this.state.email) {
      //   firebase.auth().(this.state.email, settings)
      //     .then(this.handleToken)
      //     .catch((error: Error) => {
      //       console.log(error)
      //       this.props.modelObservable.error(error)
      //     })
      // }
      // return new Promise<void>
      // .then(() => {
      //   const user = firebase.auth().currentUser
      //   if (user) {
      //     return user.getIdToken(true)
      //   }
      //   else {
      //     throw new Error('User is not logged in')
      //   }
      // })
      // .then((token) => {
      //   let model = this.state.model
      //   model.token = token
      //   this.props.modelObservable.next(model)
      // })
    }
    render () {
      const isEmail = this.state.kind == Kind.email
      return (
        <Fragment>
          <Modal isOpen={this.state.kind != Kind.unknown} onOpened={() => this.handleModalOpen()}>
            <ModalHeader>
            {
              isEmail ? "Please insert your email" : "Please insert your phone number"
            }
            </ModalHeader>
            <Form>
              <ModalBody>
                <FormGroup>
                  <Input innerRef={(inner) => this.fieldInputRef = inner} />
                </FormGroup>
                <div ref={this.recaptchaRef}></div>
              </ModalBody>
              <ModalFooter>
                <Button color='secondary' onClick={() => this.setState({kind: Kind.unknown})}>
                  Back
                </Button>
                <Button innerRef={(inner) => this.sendButtonRef = inner}
                  color='primary' 
                  disabled={!this.state.isCaptchaReady}>
                  Login
                </Button>
              </ModalFooter>
            </Form>
          </Modal>          
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