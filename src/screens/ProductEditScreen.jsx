import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { listProductDetails, updateProduct } from '../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';
import API from '../api';

const ProductEditScreen = () => {
    const { id: productId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Local state
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');
    const [uploading, setUploading] = useState(false);

    // Redux state
    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;

    const productUpdate = useSelector((state) => state.productUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate;

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET });
            navigate('/admin/productlist');
        } else {
            if (!product || product._id !== Number(productId)) {
                dispatch(listProductDetails(productId));
            } else {
                setName(product.name || '');
                setPrice(product.price || 0);
                setImage(product.image || '');
                setBrand(product.brand || '');
                setCategory(product.category || '');
                setCountInStock(product.countInStock || 0);
                setDescription(product.description || '');
            }
        }
    }, [dispatch, product, productId, navigate, successUpdate]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description,
        }));
    };

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        setImage(`/media/product_images/${file.name}`)
        formData.append('image', file);
        formData.append('product_id', productId);
        setUploading(true);
        try {
            const config = {
                headers: { 'Content-Type': 'multipart/form-data' },
            };
            const { data } = await API.post('/api/products/upload/', formData, config);
            setImage(data);
        } catch (error) {
            console.error('Image Upload Error:', error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <Link to='/admin/productlist' className='btn btn-light my-3'>
                Go Back
            </Link>

            <FormContainer>
                <h1>Edit Product</h1>

                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant='danger'>{error}</Message>
                ) : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name' className='my-2'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter product name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId='price' className='my-2'>
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Enter price'
                                value={price}
                                onChange={(e) => setPrice(Number(e.target.value))}
                            />
                        </Form.Group>

                        <Form.Group controlId='image' className='my-2'>
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter image URL'
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            />
                            <Form.Control
                                type='file'
                                onChange={uploadFileHandler}
                                className='mt-2'
                            />
                            {uploading && <Loader />}
                        </Form.Group>
                        <Form.Group controlId='brand' className='my-2'>
                            <Form.Label>Brand</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter brand'
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId='countInStock' className='my-2'>
                            <Form.Label>Stock Count</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Enter stock count'
                                value={countInStock}
                                onChange={(e) => setCountInStock(Number(e.target.value))}
                            />
                        </Form.Group>

                        <Form.Group controlId='category' className='my-2'>
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter category'
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId='description' className='my-2'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter product description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Form.Group>

                        <Button type='submit' variant='primary' className='mt-3'>
                            Update
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </div>
    );
};

export default ProductEditScreen;
