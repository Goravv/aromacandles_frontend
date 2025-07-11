
import React, { useState, useEffect } from "react";
import { Link,  useNavigate, useLocation } from "react-router-dom";
import { Row, Col, Form, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";

import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { login } from "../actions/userActions";

function LoginScreen() {
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    //const redirect = new URLSearchParams(location.search).get('redirect') || '/'    

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin

    useEffect(() => {
        if (userInfo) {
          navigate(redirect)
        }
    }, [navigate, userInfo, redirect])

    const submitHandler = (e) => {
      e.preventDefault()
      dispatch(login(email, password))
  }

  return (
    
    <FormContainer>
     <h1>Sign In</h1>
    {error && <Message variant='danger'>{error}</Message>} 
    {loading && <Loader />}
    <Form onSubmit={submitHandler}>

        <Form.Group controlId='email'>
            <Form.Label>Email name</Form.Label>
            <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            >
            </Form.Control>
        </Form.Group>


        <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
                type='password'
                placeholder='Enter Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            >
            </Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
            Sign In
        </Button>
    </Form>

    <Row className='py-3'>
        <Col>
            New Customer? <Link
                to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                Register
                </Link>
        </Col>
    </Row>

  </FormContainer>
      
  )
}

export default LoginScreen