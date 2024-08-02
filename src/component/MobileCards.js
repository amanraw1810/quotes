import axios from 'axios';
// import { useSearchParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
function MobileCards() {



    const [state, setState] = useState([]);
    // const [cate, setCate] = useState([]);
    // const [searchParams] = useSearchParams();
    // const query = searchParams.get('cate_name');
    // const getAllProducts = () => {
    //     axios.get("http://localhost:4004/product-details")
    //         .then((res) => {
    //             setState(res.data);
    //         });
    // };


    // useEffect(() => {
    //     getAllProducts();

    // }, []);



    useEffect(() => {
        axios.get('http://localhost:4004/product-details')
            .then((res) => {
                setState(res.data.data);
            })
            .catch((error) => {
                console.error('Error fetching Sub Category details:', error);
            });
    }, []);
    return (
        <>
            <div class="container">
                <div className="row">
                    <h2 className='text-start fw-bold text-muted'>Latest Products</h2>



                    {state.map((item, index) => (
                        <div className="col-md-12" style={{ width: '50%', marginBottom: '3%' }}>

                            <div key={index} className='shadow-sm rounded px-0 mx-3' style={{ height: '320px' }}>
                                <Link to="product" className='text-decoration-none'>
                                    <img src={`http://localhost:4004/uploads/${item.product_icon[2]}`} alt={item.product_icon[2]} style={{ height: '190px', margin: '5px', objectFit: 'cover' }} />

                                </Link>
                                <div className='text-center overflow-hidden px-3' style={{ color: '#003C71' }}>
                                    <h6 className='card-title'>
                                        <strong className='text-muted fw-bold'>
                                            {item.brand_name.substring(0, 10)}
                                        </strong>
                                    </h6>
                                    <p>{item.main_category_name.substring(0, 10)}</p>
                                    {/* <p>
                                        Price:<del className='text-danger'>₹ {item.price.original}</del>{' '}
                                        <span>₹ {item.price.discounted}</span>
                                    </p> */}
                                    <div className=' my-3'>
                                        <Link className='w-100 my-btn text-decoration-none' to={`product-detail/${item._id}`}>
                                            Buy Now
                                        </Link>
                                    </div>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div >
        </>
    )
}

export default MobileCards