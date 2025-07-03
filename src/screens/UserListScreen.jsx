import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Nav, Table, Button, Container, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listUsers, deleteUser } from '../actions/userActions'

function UserListScreen() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const { success: successDelete } = userDelete

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers())
        } else {
            navigate('/login')
        }
    }, [dispatch, navigate, userInfo, successDelete])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            dispatch(deleteUser(id))
        }
    }
    console.log(users)

    return (
        <Container className="mt-4">
            <Card>
                <Card.Body>
                    <h2 className="mb-4">User Management</h2>
                    {loading ? (
                        <Loader />
                    ) : error ? (
                        <Message variant='danger'>{error}</Message>
                    ) : (
                        <Table striped bordered hover responsive className='table-sm text-center'>
                            <thead className="table-dark">
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>EMAIL</th>
                                    <th>ADMIN</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>

                            <tbody>
                                {users.map(user => (
                                    <tr key={user.custom_id}>
                                        <td>{user.custom_id}</td>
                                        <td>{user.name}</td>
                                        <td>
                                            <a href={`mailto:${user.email}`}>{user.email}</a>
                                        </td>
                                        <td>
                                            {user.isAdmin ? (
                                                <i className="fas fa-check text-success">Yes</i>
                                            ) : (
                                                <i className="fas fa-times text-danger">No</i>
                                            )}
                                        </td>
                                        <td>
                                            <div className="d-flex gap-2 justify-content-center">
                                                <Nav.Link as={Link} to={`/admin/user/${user.custom_id}/edit`}>
                                                    <Button variant='outline-primary' size='sm'>
                                                        <i className='fas fa-edit'></i> Edit
                                                    </Button>
                                                </Nav.Link>
                                                <Button
                                                    variant='outline-danger'
                                                    size='sm'
                                                    onClick={() => deleteHandler(user._id)}
                                                >
                                                    <i className='fas fa-trash'></i> Delete
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </Card.Body>
            </Card>
        </Container>
    )
}

export default UserListScreen
