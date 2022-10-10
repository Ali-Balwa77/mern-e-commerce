import React, { useEffect, useReducer } from "react";
// import data from "../data";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Product from "../components/Product";
import {Helmet} from 'react-helmet-async'
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };

    case "FETCH_SCCUESS":
      return { ...state, products: action.payload, loading: false };

    case "FETCH_FAIL":
      return { ...state, error: action.payload, loading: false };

    default:
      return state;
  }
};

const HomeScreen = () => {
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
    products: [],
  });
  // const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/products");
        dispatch({ type: "FETCH_SCCUESS", payload: result.data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: error.message });
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <Helmet>
        <title>E-commerce</title>
      </Helmet>
      <h1>Featured Products</h1>
      <div className="products">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant='danger'>{error}</MessageBox>
        ) : (
          <Row>
            {products.map((product) => (
              <Col sm={6} md={4} lg={3} className="mb-3" key={product.slug}>
                <Product product={product}></Product>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
