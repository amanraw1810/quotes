// import { Link } from 'react-router-dom';
import axios from 'axios';
// import { useSearchParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Slider() {

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
        axios.get('http://localhost:4004/category-details')
            .then((res) => {
                setState(res.data.data);
            })
            .catch((error) => {
                console.error('Error fetching Sub Category details:', error);
            });
    }, []);

    // const handleCategoryClick = (category) => {
    //     showCategory(category);
    // };
    return (
        <>
            <div class="scroll-container w-100 d-flex" >
                {state.map((item, index) => (
                    <Link to={`category/${item.category_name}`} className='textdecoration text-center'>
                        <div class="text-light fw-bold mx-3  p-2 mytext" style={{}}>

                            <img src={`http://localhost:4004/uploads/${item.category_icon}`} alt={item.category_icon} style={{ border: '2px solid #003C71', borderRadius: '50rem', height: '60px', width: '60px', objectFit: 'fill' }} />

                        </div>
                        <div class="text-center overflow-hidden fw-bold" style={{ color: '#003C71' }} >
                            {item.category_name.substring(0, 10)}
                        </div>
                    </Link>


                ))}







            </div>
        </>
    )
}

export default Slider