import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function Search() {
    const { searchQuery } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:4004/searching-product/${searchQuery}`)
            .then((res) => {
                console.log('API response:', res.data.data); // Log API response
                setProducts(res.data.data);
            })
            .catch((error) => {
                console.error('Error fetching product details:', error);
            });
    }, [searchQuery]);

    return (
        <div className="container">
            <div className="row pt-3 mt-3">
                <h2 className="text-start fw-bold text-muted mt-5 fs-5">Latest {searchQuery}</h2>
                {products.length > 0 ? (
                    products.map((item, index) => (
                        <div className="col-md-3 col-sm-6 mb-4" key={index}>
                            <div className="shadow-sm rounded p-3 mx-3 h-100">
                                <Link to={`/product-detail/${item._id}`} className="text-decoration-none">
                                    <img
                                        src={`http://localhost:4004/uploads/${item.product_icon[2]}`}
                                        alt={item.product_icon[2]}
                                        className="img-fluid rounded"
                                        style={{ height: '190px', objectFit: 'cover' }}
                                    />
                                </Link>
                                <div className="text-center mt-2" style={{ color: '#003C71' }}>
                                    <h6 className="card-title">
                                        <strong className="text-muted fw-bold">
                                            {item.brand_name.substring(0, 10)}
                                        </strong>
                                    </h6>
                                    <p>{item.main_category_name.substring(0, 10)}</p>
                                    <div className="my-3">
                                        <Link
                                            className="btn btn-primary w-100"
                                            to={`/product-detail/${item._id}`}
                                        >
                                            Buy Now
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-muted">No results found</p>
                )}
            </div>
        </div>
    );
}

export default Search;
