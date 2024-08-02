import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function Category() {
    const { category_name } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:4004/category/${category_name}`)
            .then((res) => {
                console.log('API response:', res.data.data); // Log API response
                setProducts(res.data.data);
            })
            .catch((error) => {
                console.error('Error fetching product details:', error);
            });
    }, [category_name]);

    return (
        <div>
            <div className="container p-0">
                <div className="row m-0 p-0">
                    <h2 className="text-start fw-bold text-muted">Latest {category_name}</h2>
                    {products.length > 0 ? products.map((item, index) => (
                        <div className="col-md-2" style={{ height: '300px', marginBottom: '10%' }} key={index}>
                            <div className="shadow-sm rounded px-0 mx-3" style={{ height: '320px' }}>
                                <Link to={`product-detail/${item._id}`} className="text-decoration-none">
                                    <img src={`http://localhost:4004/uploads/${item.product_icon[2]}`} alt={item.product_icon[2]} style={{ height: '190px', margin: '5px', objectFit: 'cover' }} />
                                </Link>
                                <div className="text-center overflow-hidden px-3" style={{ color: '#003C71' }}>
                                    <h6 className="card-title">
                                        <strong className="text-muted fw-bold">
                                            {item.brand_name.substring(0, 10)}
                                        </strong>
                                    </h6>
                                    <p>{item.main_category_name.substring(0, 10)}</p>
                                    <div className="my-3">
                                        <Link className="w-100 my-btn text-decoration-none" to={`/product-detail/${item._id}`}>
                                            Buy Now
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <p className="text-muted">No products found</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Category
