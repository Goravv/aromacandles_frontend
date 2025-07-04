// import React, { useEffect } from 'react'
// import { Row, Col, ListGroup, Image, Card ,Button} from 'react-bootstrap'
// import { Link, useNavigate, useParams } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
// import Message from '../components/Message'
// import Loader from '../components/Loader'
// import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderActions'
// // import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
// import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants'

// function PlaceOrderScreen() {
//   const dispatch = useDispatch()
//   const { id: orderId } = useParams()

//   const orderDetails = useSelector((state) => state.orderDetails)
//   const { order, error, loading } = orderDetails

//   const orderPay = useSelector((state) => state.orderPay)
//   const { loading: loadingPay, success: successPay } = orderPay

//   const orderDeliver = useSelector(state => state.orderDeliver)
//   const { loading: loadingDeliver, success: successDeliver } = orderDeliver

//   const userLogin = useSelector(state => state.userLogin)
//   const { userInfo } = userLogin

//   useEffect(() => {

//     if (!userInfo) {
//       // history.push('/login')
//     }

//     if (!order || successPay || order._id !== Number(orderId) || successDeliver) {
//       dispatch({ type: ORDER_PAY_RESET })
//       dispatch({ type: ORDER_DELIVER_RESET })
//       dispatch(getOrderDetails(orderId))
//     }
//   }, [dispatch, orderId, order, successPay, successDeliver])

//   // if (!loading && !error) {
//   //   const itemsPrice = order?.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
//   //   order.itemsPrice = itemsPrice
//   // }

//   const calculateItemsPrice = (currentOrder) => {
//     if (currentOrder?.orderItems) {
//       return currentOrder.orderItems.reduce(
//         (acc, item) => acc + (item?.price || 0) * (item?.qty || 0),
//         0
//       ).toFixed(2);
//     }
//     return '0.00'; // Default value if orderItems is missing
//   };

//   const successPaymentHandler = (paymentResult) => {
//     dispatch(payOrder(orderId, paymentResult))
//   }

//   const deliverHandler = () => {
//     dispatch(deliverOrder(order))
// }

//   const initialOptions = {
//     'client-id': 'AQ1zr3uNdiAmp-X9yuzhpPZRwgFfyYLxqnuD3Zc-a-CFnaMzPZn_8Il9rBJgnZEJ1CifmejGspqCV0lU',
//     currency: 'USD',
//     intent: 'capture',
//   }

//   return loading ? (
//     <Loader />
//   ) : error ? (
//     <Message variant="danger">{error}</Message>
//   ) : (
//     // <PayPalScriptProvider options={initialOptions}>
//     <>
//       <h1>Order: {order._id}</h1>
//       <Row>
//         <Col md={8}>
//           <ListGroup variant="flush">
//             <ListGroup.Item>
//               <h2>Shipping</h2>
//               <p>
//                 <strong>Name:</strong> {order.user.name}
//               </p>
//               <p>
//                 <strong>Email:</strong>{' '}
//                 <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
//               </p>
//               <p>
//                 {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
//                 {order.shippingAddress.postalCode}, {order.shippingAddress.country}
//               </p>
//               {order.isDelivered ? (
//                 <Message variant="success">Delivered on {order.deliveredAt}</Message>
//               ) : (
//                 <Message variant="warning">Not Delivered</Message>
//               )}
//             </ListGroup.Item>

//             <ListGroup.Item>
//               <h2>Payment Method</h2>
//               <p>
//                 <strong>Method:</strong> {order.paymentMethod}
//               </p>
//               {order.isPaid ? (
//                 <Message variant="success">Paid on {order.paidAt}</Message>
//               ) : (
//                 <Message variant="warning">Not Paid</Message>
//               )}
//             </ListGroup.Item>

//             <ListGroup.Item>
//               <h2>Order Items</h2>
//               {order.orderItems.length === 0 ? (
//                 <Message>Order is empty</Message>
//               ) : (
//                 <ListGroup variant="flush">
//                   {order.orderItems.map((item, index) => (
//                     <ListGroup.Item key={index}>
//                       <Row>
//                         <Col md={1}>
//                           <Image src={item.image} alt={item.name} fluid rounded />
//                         </Col>
//                         <Col>
//                           <Link to={`/product/${item.product}`}>{item.name}</Link>
//                         </Col>
//                         <Col md={4}>
//                           {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
//                         </Col>
//                       </Row>
//                     </ListGroup.Item>
//                   ))}
//                 </ListGroup>
//               )}
//             </ListGroup.Item>
//           </ListGroup>
//         </Col>

//         <Col md={4}>
//           <Card>
//             <ListGroup variant="flush">
//               <ListGroup.Item>
//                 <h2>Order Summary</h2>
//               </ListGroup.Item>
//               <ListGroup.Item>
//                 <Row>
//                   <Col>Items:</Col>
//                   <Col>${calculateItemsPrice(order)}</Col>
//                 </Row>
//               </ListGroup.Item>
//               <ListGroup.Item>
//                 <Row>
//                   <Col>Shipping:</Col>
//                   <Col>${order.shippingPrice}</Col>
//                 </Row>
//               </ListGroup.Item>
//               <ListGroup.Item>
//                 <Row>
//                   <Col>Tax:</Col>
//                   <Col>${order.taxPrice}</Col>
//                 </Row>
//               </ListGroup.Item>
//               <ListGroup.Item>
//                 <Row>
//                   <Col>Total:</Col>
//                   <Col>${order.totalPrice}</Col>
//                 </Row>
//               </ListGroup.Item>

//               {!order.isPaid && (
//                 <ListGroup.Item>
//                   {loadingPay && <Loader />}
//                   <PayPalButtons
//                     style={{ layout: 'vertical' }}
//                       createOrder={(data, actions) => {
//                       return actions.order.create({
//                         purchase_units: [
//                           {
//                             amount: {
//                               value: order.totalPrice.toString(),
//                             },
//                           },
//                         ],
//                       })
//                     }}
//                      onApprove={(data, actions) => {
//                       return actions.order.capture().then((details) => {
//                         successPaymentHandler(details)
//                       })
//                     }}
//                     onError={(err) => {
//                       console.error('PayPal error:', err)
//                     }}
//                   />
//                 </ListGroup.Item>
//               )}
//             </ListGroup>
//             {loadingDeliver && <Loader />}
//                                 {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
//                                     <ListGroup.Item>
//                                         <Button
//                                             type='button'
//                                             className='btn btn-block'
//                                             onClick={deliverHandler}
//                                         >
//                                             Mark As Delivered
//                                         </Button>
//                                     </ListGroup.Item>
//                                 )}
//           </Card>
//         </Col>
//       </Row>
//     </PayPalScriptProvider>
//   )
// }

// export default PlaceOrderScreen