// import React, { Component, Fragment } from 'react'
// import Head from 'next/head'
// import {
//   Container,
//   Row,
//   Col,
//   Nav,
//   NavLink
// } from 'reactstrap'
// import { graphql } from 'react-apollo'
// import { Subject } from 'rxjs'
// import { orders } from '~/graphql/queries/orders.gql'
// import { ordersSubs } from '~/graphql/subscriptions/orders.gql'
// import Map from '~/components/common/map'
// import Orders from '~/components/layout/orders'
// import RegisterUser from '~/components/forms/register-user'

// class Dashboard extends Component {
//   constructor (props) {
//     super(props)
//     this.changeSection = this.changeSection.bind(this)
//     this.state = {
//       section: 0
//     }
//   }
//   changeSection (section) {
//     this.setState({ section })
//   }
//   componentDidMount () {
//     this.props.subscribeToNewOrders()
//   }
//   render () {
//     const subject = new Subject()
//     const { state } = this
//     let content = null
//     if (state.section === 1) {
//       content = <RegisterUser {...this.props} />
//     } else {
//       content = (
//         <Fragment>
//           <Col xs='5' md='4'>
//             <Orders
//               {...this.props}
//               orders={this.props.orders}
//               onToggleSelectSubject={subject}
//               onOrdersFilter={(filter) => {
//                 this.props.onOrdersFilter(filter)
//                 this.props.refetch(filter)
//               }}
//             />
//           </Col>
//           <Col>
//             <Map
//               {...this.props}
//               orders={this.props.orders}
//               onToggleSelectSubject={subject}
//               defaultZoom={13}
//               defaultCenter={{ lat: 53.551086, lng: 9.993682 }}
//               googleMapURL='https://maps.googleapis.com/maps/api/js?key=AIzaSyAKWwTfmNE3_KwzCO4qmcHDSEmXcVApNbI&v=3.exp&libraries=geometry,drawing,places'
//               loadingElement={<div style={{ height: `100%` }} />}
//               containerElement={<div style={{ height: `100%` }} />}
//               mapElement={<div style={{ height: `100%` }} />}
//             />
//           </Col>
//         </Fragment>
//       )
//     }
//     return (
//       <Fragment>
//         <Head>
//           <title>Dashboard</title>
//         </Head>
//         <Container fluid className='w-100 m-0 p-0 d-flex flex-column' style={{height: '100vh'}}>
//           <Row noGutters>
//             <Nav>
//               <NavLink
//                 active={state.section === 0}
//                 href='#'
//                 onClick={() => this.changeSection(0)}>
//                 Dashboard
//               </NavLink>
//               <NavLink
//                 active={state.section === 1}
//                 href='#'
//                 onClick={() => this.changeSection(1)}>
//                 Add new pharmacy
//               </NavLink>
//               <NavLink
//                 href='#'
//                 onClick={() => this.props.onToken(null)}>
//                 Log out
//               </NavLink>
//             </Nav>
//           </Row>
//           <Row noGutters className='w-100' style={{flex: '1'}}>
//             {content}
//           </Row>
//         </Container>
//       </Fragment>
//     )
//   }
// }

// const requestOrders = graphql(orders, {
//   options: ({ token, ordersFilter: { statuses, dateRange } }) => {
//     return {
//       variables: {
//         params: {
//           token: token,
//           filtering: {
//             statuses: statuses,
//             dateRange: {
//               start: dateRange.start,
//               end: dateRange.end
//             }
//           }
//         }
//       }
//     }
//   },
//   props: ({ ownProps: { token }, data: { getOrders, subscribeToMore, variables, refetch } }) => {
//     return {
//       orders: getOrders,
//       subscribeToNewOrders: () => {
//         subscribeToMore({
//           document: ordersSubs,
//           variables: variables
//         })
//       },
//       refetch: (filtering) => {
//         refetch({ params: { token, filtering } })
//       }
//     }
//   }
// })

// export default requestOrders(Dashboard)
