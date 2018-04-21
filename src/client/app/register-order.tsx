// import React, { Component, Fragment } from 'react'
// import Head from 'next/head'
// import moment from 'moment'
// import DatePicker from 'react-datepicker'
// import {
//   Container,
//   Row,
//   Col,
//   Nav,
//   NavLink,
//   Form,
//   Input,
//   FormGroup,
//   Label,
//   Button,
//   FormText,
//   Modal,
//   ModalHeader,
//   ModalBody,
//   ModalFooter
// } from 'reactstrap'
// import { graphql } from 'react-apollo'
// import { registerOrder } from '~/graphql/mutations/orders.gql'

// class RegisterOrder extends Component {
//   constructor (props) {
//     super(props)
//     this.requestDelivery = this.requestDelivery.bind(this)
//     this.handleInputChange = this.handleInputChange.bind(this)
//     this.handleTimeChange = this.handleTimeChange.bind(this)
//     this.handleDateChange = this.handleDateChange.bind(this)

//     let date = moment()
//     const {start, end} = this.fitDatesToInterval(
//       date.clone(),
//       date.clone().add(30, 'minutes')
//     )

//     const street = props.company && props.company.address && props.company.address.street
//     const zipNo = props.company && props.company.address && props.company.address.zipNo
//     const city = props.company && props.company.address && props.company.address.city
//     this.state = {
//       senderStreetName: street,
//       senderHouse: '',
//       senderZipNo: zipNo,
//       senderCity: city,
//       recipientStreetName: 'Hermannstraße',
//       recipientHouse: '37',
//       recipientZipNo: '20095',
//       recipientCity: 'Hamburg',
//       recipientFirstName: 'Valentin',
//       recipientLastName: 'Radu',
//       recipientPhoneNumber: '+40734366903',
//       type: 'now',
//       dateRange: {
//         start: start.format('YYYY-MM-DD[T]HH:mm:ss'),
//         end: end.format('YYYY-MM-DD[T]HH:mm:ss')
//       }
//     }
//   }
//   fitDatesToInterval (s, e) {
//     let remainder = s.minute() % 30
//     let start = s.clone().add(remainder > 0 ? 30 - remainder : 0, 'minutes')
//     const morning = s.clone().hours(12).minutes(0)
//     if (start.isBefore(morning)) {
//       start = morning
//     }

//     e = moment.max([e, start.clone().add(30, 'minutes')])
//     remainder = e.minute() % 30
//     let end = e.clone().add(remainder > 0 ? 30 - remainder : 0, 'minutes')
//     const evening = e.clone().hours(20).minutes(0)
//     if (end.isAfter(evening)) {
//       const day = end.isoWeekday() % 5 + 1
//       if (end.isoWeekday() >= day) {
//         end.add(1, 'weeks').isoWeekday(day).hours(12).minutes(30)
//       } else {
//         end.isoWeekday(day).hours(12).minutes(30)
//       }
//     }
//     return {start, end}
//   }
//   handleInputChange (event) {
//     const { target: { value, name } } = event
//     this.setState({
//       [name]: value
//     })
//   }
//   handleDateChange (date) {
//     const oldStartDate = moment(this.state.dateRange.start)
//     const oldEndDate = moment(this.state.dateRange.end)
//     let startDate = date.clone().hour(oldStartDate.hour()).minute(oldStartDate.minute())
//     let endDate = date.clone().hour(oldEndDate.hour()).minute(oldEndDate.minute())
//     const { start, end } = this.fitDatesToInterval(startDate, endDate)
//     this.setState({
//       dateRange: {
//         start: start.format('YYYY-MM-DD[T]HH:mm:ss'),
//         end: end.format('YYYY-MM-DD[T]HH:mm:ss')
//       }
//     })
//   }
//   handleTimeChange (event) {
//     const { target: { value } } = event
//     const [hour, minute] = value.split('-')
//     const oldStartDate = moment(this.state.dateRange.start)
//     const startDate = oldStartDate.clone().hour(hour).minute(minute)
//     const endDate = startDate.clone().add(30, 'minutes')
//     const { start, end } = this.fitDatesToInterval(startDate, endDate)
//     this.setState({
//       dateRange: {
//         start: start.format('YYYY-MM-DD[T]HH:mm:ss'),
//         end: end.format('YYYY-MM-DD[T]HH:mm:ss')
//       }
//     })
//   }
//   requestDelivery (e, a) {
//     e.preventDefault()
//     this.props.submit(this.state)
//       .then(() => {
//         const result = {}
//         this.setState({ result })
//       }).catch(error => {
//         this.setState({ error })
//       })
//   }
//   render () {
//     const panelWidth = 800
//     const { company } = this.props
//     const { state } = this
//     const startDate = moment(state.dateRange.start)
//     const minStartDate = moment()
//     const maxStartDate = moment().add(3, 'months')
//     const minStartTime = moment.max([minStartDate, startDate.clone().hours(12).minutes(0)])
//     const maxStartTime = startDate.clone().hours(20).minutes(0)

//     const weekends = []
//     let iterator = minStartDate.clone()
//     while (iterator < maxStartDate) {
//       const day = iterator.isoWeekday()
//       if (day === 7 || day === 6) {
//         weekends.push(iterator.clone())
//       }
//       iterator = iterator.add(1, 'day')
//     }

//     const times = []
//     iterator = minStartTime.clone()
//     let key = 0
//     while (iterator < maxStartTime) {
//       const hour = iterator.hour()
//       const minute = iterator.minute()
//       const startTime = iterator.clone()
//       iterator = iterator.add(30, 'minutes')
//       const endTime = iterator.clone()
//       const { start, end } = this.fitDatesToInterval(startTime, endTime)
//       times.push(
//         <option
//           key={key}
//           value={hour + '-' + minute}>
//           {start.format('HH:mm')} - {end.format('HH:mm')}
//         </option>
//       )
//       key++
//     }
//     return (
//       <Fragment>
//         <Head>
//           <title>Register Order</title>
//         </Head>
//         <Modal isOpen={Boolean(state.result)}>
//           <ModalHeader>Success</ModalHeader>
//           <ModalBody>
//             The order was created!
//           </ModalBody>
//           <ModalFooter>
//             <Button color='primary' onClick={() => {
//               const result = null
//               this.setState({ result })
//             }}>
//               OK
//             </Button>
//           </ModalFooter>
//         </Modal>
//         <Modal isOpen={Boolean(state.error)}>
//           <ModalHeader>Error</ModalHeader>
//           <ModalBody>
//             We sorry. We fix it. {this.props.extractErrorCodes(state.error)}
//           </ModalBody>
//           <ModalFooter>
//             <Button color='primary' onClick={() => {
//               const error = null
//               this.setState({ error })
//             }}>
//               OK
//             </Button>
//           </ModalFooter>
//         </Modal>
//         <Container fluid className='mx-auto m-0 p-0' style={{width: panelWidth + 'px'}}>
//           <Row noGutters>
//             <Nav>
//               <NavLink href='#' onClick={() => this.props.onToken(null)}>Log out</NavLink>
//             </Nav>
//           </Row>
//           <Row noGutters className='pt-2 pb-4'>
//             <Col>
//               <span>Delivery times: Mo - Fr, 12:00 - 18:00</span>
//               <br />
//               <span>More information: www.now.delivery</span>
//             </Col>
//             <Col className='text-right'>
//               <span>Support: Simon Schoen</span>
//               <br />
//               <span>040 53798993</span>
//             </Col>
//           </Row>
//           <Row noGutters className='pt-2 pb-4'>
//             <Col>
//               <h2>{company && company.name}</h2>
//               <h3>Create Order</h3>
//               <Form onSubmit={this.requestDelivery}>
//                 <FormGroup row>
//                   <Col md='3'>
//                     <Label for='selectType'>Pickup time</Label>
//                     <Input type='select' name='type' id='selectType' onChange={this.handleInputChange}>
//                       <option value='now'>Now</option>
//                       <option value='later'>Later</option>
//                     </Input>
//                   </Col>
//                 </FormGroup>
//                 {state.type === 'later' ? (
//                   <FormGroup className='d-flex'>
//                     <Col>
//                       <Row>
//                         <Label for='selectDate'>Date</Label>
//                       </Row>
//                       <Row>
//                         <DatePicker
//                           id='selectDate'
//                           dateFormat='DD-MM-YYYY'
//                           selected={startDate}
//                           excludeDates={weekends}
//                           minDate={minStartDate}
//                           maxDate={maxStartDate}
//                           onChange={date => this.handleDateChange(date)}
//                         />
//                       </Row>
//                     </Col>
//                     <Col>
//                       <Row>
//                         <Label for='selectTime'>Time</Label>
//                       </Row>
//                       <Row>
//                         <Input
//                           type='select'
//                           name='time' id='selectTime'
//                           onChange={this.handleTimeChange}>
//                           {times}
//                         </Input>
//                       </Row>
//                     </Col>
//                   </FormGroup>
//                 ) : null}
//                 <FormGroup>
//                   <legend>Pickup from:</legend>
//                 </FormGroup>
//                 <FormGroup row>
//                   <Col md='9'>
//                     <Label for='senderStreetName'>Street</Label>
//                     <Input
//                       value={this.state.senderStreetName}
//                       name='senderStreetName'
//                       id='senderStreetName'
//                       onChange={this.handleInputChange} />
//                   </Col>
//                   <Col md='3'>
//                     <Label for='senderHouse'>House</Label>
//                     <Input
//                       value={this.state.senderHouse}
//                       name='senderHouse'
//                       id='senderHouse'
//                       onChange={this.handleInputChange} />
//                   </Col>
//                 </FormGroup>
//                 <FormGroup row>
//                   <Col md='3'>
//                     <Label for='senderZipNo'>Postal code</Label>
//                     <Input
//                       value={this.state.senderZipNo}
//                       name='senderZipNo'
//                       id='senderZipNo'
//                       onChange={this.handleInputChange} />
//                   </Col>
//                   <Col md='9'>
//                     <Label for='senderCity'>City</Label>
//                     <Input
//                       value={this.state.senderCity}
//                       name='senderCity'
//                       id='senderCity'
//                       onChange={this.handleInputChange} />
//                   </Col>
//                 </FormGroup>
//                 <FormGroup>
//                   <legend>Deliver to:</legend>
//                 </FormGroup>
//                 <FormGroup row>
//                   <Col md='9'>
//                     <Label for='recipientStreetName'>Street</Label>
//                     <Input
//                       value={this.state.recipientStreetName}
//                       name='recipientStreetName'
//                       id='recipientStreetName'
//                       onChange={this.handleInputChange} />
//                   </Col>
//                   <Col md='3'>
//                     <Label for='recipientHouse'>House</Label>
//                     <Input
//                       value={this.state.recipientHouse}
//                       name='recipientHouse'
//                       id='recipientHouse'
//                       onChange={this.handleInputChange} />
//                   </Col>
//                 </FormGroup>
//                 <FormGroup row>
//                   <Col md='3'>
//                     <Label for='recipientZipNo'>Postal code</Label>
//                     <Input
//                       value={this.state.recipientZipNo}
//                       name='recipientZipNo'
//                       id='recipientZipNo'
//                       onChange={this.handleInputChange} />
//                   </Col>
//                   <Col md='9'>
//                     <Label for='recipientCity'>City</Label>
//                     <Input
//                       value={this.state.recipientCity}
//                       name='recipientCity'
//                       id='recipientCity'
//                       onChange={this.handleInputChange} />
//                   </Col>
//                 </FormGroup>
//                 <FormGroup>
//                   <legend>Recipient details</legend>
//                 </FormGroup>
//                 <FormGroup row>
//                   <Col md='6'>
//                     <Label for='recipientFirstName'>First Name</Label>
//                     <Input
//                       value={this.state.recipientFirstName}
//                       name='recipientFirstName'
//                       id='recipientFirstName'
//                       onChange={this.handleInputChange}
//                     />
//                   </Col>
//                   <Col md='6'>
//                     <Label for='recipientLastName'>Last Name</Label>
//                     <Input
//                       value={this.state.recipientLastName}
//                       name='recipientLastName'
//                       id='recipientLastName'
//                       onChange={this.handleInputChange}
//                     />
//                   </Col>
//                 </FormGroup>
//                 <FormGroup row>
//                   <Col md='6'>
//                     <Label for='recipientPhoneNumber'>Phone</Label>
//                     <Input
//                       value={this.state.recipientPhoneNumber}
//                       name='recipientPhoneNumber'
//                       id='recipientPhoneNumber'
//                       onChange={this.handleInputChange}
//                     />
//                   </Col>
//                 </FormGroup>
//                 <FormGroup>
//                   <legend>
//                     <span>TOTAL (Incl. VAT)</span>
//                     <br />
//                     <span>€3.00</span>
//                   </legend>
//                 </FormGroup>
//                 <Button>Request delivery</Button>
//                 <FormText color='muted'>
//                   By making the request you agree to our <a href='#'>Terms and conditions</a>
//                 </FormText>
//               </Form>
//             </Col>
//           </Row>
//         </Container>
//       </Fragment>
//     )
//   }
// }

// export default graphql(registerOrder, {
//   props: ({ ownProps: { token, company, location }, mutate }) => {
//     let result = {}
//     const geocodePromise = (street, city, zipNo, country) => {
//       const geocoder = new window.google.maps.Geocoder()
//       const stringAddress = [street, city, zipNo, country].join(', ')
//       return new Promise((resolve, reject) => {
//         geocoder.geocode({'address': stringAddress}, (results, status) => {
//           if (status === 'OK') {
//             resolve({
//               lat: results[0].geometry.location.lat().toFixed(6),
//               lon: results[0].geometry.location.lng().toFixed(6)
//             })
//           } else {
//             reject(new Error('Couldnt\'t find the location ' + stringAddress))
//           }
//         })
//       })
//     }
//     result.submit = ({
//       recipientStreetName, recipientHouse, recipientZipNo, recipientCity,
//       recipientFirstName, recipientLastName, recipientPhoneNumber,
//       senderStreetName, senderHouse, senderZipNo, senderCity,
//       dateRange, type
//     }) => {
//       const country = 'Germany'
//       const dropoffAddress = {
//         street: recipientStreetName + ' ' + recipientHouse,
//         city: recipientCity,
//         zipNo: recipientZipNo,
//         country
//       }
//       const pickupAddress = {
//         street: senderStreetName + ' ' + senderHouse,
//         city: senderCity,
//         zipNo: senderZipNo,
//         country
//       }
//       const category = 'fixed'
//       let scheduledDate
//       if (type === 'later' && dateRange) {
//         scheduledDate = moment(dateRange.start).toISOString()
//       }

//       return Promise.all([
//         geocodePromise(recipientStreetName, recipientHouse, recipientZipNo, recipientCity),
//         geocodePromise(senderStreetName, senderHouse, senderZipNo, senderCity)
//       ])
//         .then(([pickup, dropoff]) => {
//           return mutate({
//             variables: {
//               params: {
//                 token,
//                 category,
//                 pickup,
//                 dropoff,
//                 pickupAddress,
//                 dropoffAddress,
//                 recipientFirstName,
//                 recipientLastName,
//                 recipientPhoneNumber,
//                 scheduledDate
//               }
//             }
//           })
//         })
//     }
//     return result
//   }
// })(RegisterOrder)
