import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProductDetailsStyles.css";
import { useCart } from "../context/cart";
import { toast } from 'react-hot-toast';



const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [frequentProducts, setFrequentProducts] = useState([]);
  // const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  // const[ loading, setLoading] = useState(false);
  const [cart, setCart] = useCart();

  //initalp details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div class="cover">
      <div className="row container product-details ">
        <div className="col-md-3 ">
          <img
            src={`/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
           
          />
        </div>
        <div className="col-md-6 product-details-info">
          <h1 className="text-center">Product Details</h1>
          <hr />
          <h6>Name : {product.name}</h6>
          <h6>Description : {product.description}</h6>
          <h6>
            Price :
            {product?.price?.toLocaleString("ne-NP", {
              style: "currency",
              currency: "NRS",
            })}
          </h6>
          <h6>Category : {product?.category?.name}</h6>
          <button class="btn btn-secondary ms-1"
          onClick={() => {
            setCart([...cart]);
            localStorage.setItem(
              "cart",
              JSON.stringify([...cart])
            );
            toast.success("Item Added to cart");
          }}
          >
            ADD TO CART
            </button>
        </div>
      </div>
      </div>
      <hr />
            {/* Frequently purchase product */}
            {/* <div className="row container frequently-purchase-products">
        <h4>Frequently Purchase Products ➡️</h4>
        {frequentProducts.length < 1 && (
          <p className="text-center">No Frequently Purchase Products Found!</p>
        )}
        <div className="d-flex flex-wrap">
          {frequentProducts?.map((p) => (
            <div className="card m-2" style={{width:"18rem"}} key={p._id}>
              <div className='image_wrapper_similar_product' style={{width:"100%",height: "50%", overflow:"hidden"}}>

              <img
                src={`/api/v1/product/product-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
                style={{width:"100%",height: "100%", objectFit: "contain"}}
              />
              </div>
              <div className="card-body">
                <div className="card-name-price">
                  <h5 className="card-title">{p.name}</h5>
                </div>
                <h5 className="card-text"> Rs.{p.price}</h5>
                <p className="card-text ">
                  {p.description.substring(0, 20)}...
                </p>
                <div className="card-name-price">
                  <button
                    className="btn btn-info ms-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                  <button
                  className="btn btn-dark ms-1"
                  onClick={() => {
                    setCart([...cart, p]);
                    localStorage.setItem(
                      "cart",
                      JSON.stringify([...cart, p])
                    );
                    toast.success("Item Added to cart");
                  }}
                >
                  ADD TO CART
                </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <hr/> */}
      <div className="row container similar-products">
        <h4>Similar Products ➡️</h4>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <div className="card m-2" style={{width:"18rem"}} key={p._id}>
              <div className='image_wrapper_similar_product' style={{width:"100%",height: "50%", overflow:"hidden"}}>

              <img
                src={`/api/v1/product/product-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
                style={{width:"100%",height: "100%", objectFit: "contain"}}
              />
              </div>
              <div className="card-body">
                <div className="card-name-price">
                  <h5 className="card-title">{p.name}</h5>
                </div>
                <h5 className="card-text"> Rs.{p.price}</h5>
                <p className="card-text ">
                  {p.description.substring(0, 20)}...
                </p>
                <div className="card-name-price">
                  <button
                    className="btn btn-info ms-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                  <button
                  className="btn btn-dark ms-1"
                  onClick={() => {
                    setCart([...cart, p]);
                    localStorage.setItem(
                      "cart",
                      JSON.stringify([...cart, p])
                    );
                    toast.success("Item Added to cart");
                  }}
                >
                  ADD TO CART
                </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div> */}
      </div>



    </Layout>
  );
};

export default ProductDetails;
