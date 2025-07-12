import React, {  useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation} from "react-router-dom";
import { listProducts } from "../actions/productActions";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import ProductCarousel from '../components/ProductCarousel'
import Paginate from '../components/Paginate'
// import products from "../products";
 
function HomeScreen() {
  // const { products, isLoading, isError, error } = useSelector(
  //   (state) => state.products
  // );
  const dispatch = useDispatch()
//   const navigate = useNavigate()
  const location = useLocation()
  const productList = useSelector(state => state.productList)
  const { error, loading, products, page, pages } = productList

  const keyword = location.search
 
  useEffect(() => {
    dispatch(listProducts(keyword))
 
  },  [dispatch, keyword]);
  console.log(products)
  return (
    <div>
        {!keyword && <ProductCarousel />}

        <h1>Latest Products</h1>
        {loading ? <Loader />
            : error ? <Message variant='danger'>{error}</Message>
                :
                <div>
                    <Row>
                        {products.map(product => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
                    <Paginate page={page} pages={pages} keyword={keyword} />
                </div>
        }
    </div>
)
}
export default HomeScreen;