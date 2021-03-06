import React, { Component } from 'react';
import { ProductContext } from './context';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { StoreProducts } from './../data';
import NumberFormat from "react-number-format";
const Details = ({match}) => {
    const { details, addToCart } = useContext(ProductContext);
     const { products } = useContext(ProductContext);
  
    const [storeProducts, setStoreProducts] = products
    

    

    
    return (
    <div className='details-page'>
            {storeProducts.map((storeProduct) => {
           const {
             title,
             img,
             price,
             company,
             info,
             inCart,
             id,
                } = storeProduct;
              
                    if (match.params.id == id) {
                        return (
                          <div className="container" key={id}>
                            <div className="row">
                              <div className="col-12 phone-title">
                                <h3 className="text-center ">{title}</h3>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-6">
                                <img src={img} className="img-fluid" alt="" />
                              </div>
                              <div className="col-md-6 phone-info">
                                <h4>Model : {title}</h4>
                                <h5>MADE BY : {company}</h5>
                                <h3>
                                  Price :{" "}
                                  <NumberFormat
                                    value={price}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"#"}
                                  />
                                </h3>
                                <h6> Some info About Product : </h6>
                                <p>{info}</p>
                                <div className="btns">
                                  <Link to="/">
                                    <button>Back To Products</button>
                                  </Link>
                                  <button
                                    onClick={() => {
                                      addToCart(id);
                                    }}
                                    disabled={inCart}
                                  >
                                    {inCart ? "In Cart" : "Add To Cart"}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                  }
              })}
       
</div>
    );
}
 
export default Details;