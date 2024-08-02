import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Collapsible({ title, content, isActive, toggleCollapsible }) {
    return (
        <div className="container">
            <button
                type="button"
                className={`collapsible my-btn w-100 my-1 ${isActive ? 'active' : ''}`}
                onClick={toggleCollapsible}
            >
                <span className="ms-3 float-start">Best Of {title}</span>
                <i className={`fa-solid fa-angle-${isActive ? 'down' : 'up'} float-end mt-1`}></i>
            </button>
            <div className="content" style={{ display: isActive ? 'block' : 'none' }}>
                {content}
            </div>
        </div>
    );
}

function MobileCollapsible() {
    const [state, setState] = useState([]);
    const [activeCollapsibles, setActiveCollapsibles] = useState([]); // Default to all collapsibles active
    const _useNavigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:4004/product-details')
            .then((res) => {
                setState(res.data.data);
                setActiveCollapsibles(new Array(res.data.data.length).fill(true)); // Set all collapsibles to active
            })
            .catch((error) => {
                console.error('Error fetching product details:', error);
            });
    }, []);

    const toggleCollapsible = (index) => {
        setActiveCollapsibles((prevActiveCollapsibles) =>
            prevActiveCollapsibles.map((isActive, i) => (i === index ? !isActive : isActive))
        );
    };

    const goToNext = (id) => {
        _useNavigate(`product-detail/${id}`);
    };

    return (
        <>
            {state.map((item, index) => (
                <Collapsible
                    key={index}
                    title={item.category_name}
                    content={
                        <div className="scroll-container m-0 p-0 d-flex">
                            <div className="bg-light shadow-sm rounded text-dark fw-bold mx-2 py-2 mytext my-2" style={{ height: '320px' }}>
                                <Link to='product' className='text-decoration-none w-50'>
                                    <img src={`http://localhost:4004/uploads/${item.product_icon[2]}`} alt={item.product_icon[2]} height='150px' width='100%' style={{ objectFit: 'cover' }} />
                                </Link>
                                <div className='text-center overflow-hidden px-3' style={{ color: '#003C71' }}>
                                    <h6 className='card-title'>
                                        <strong className='text-muted fw-bold'>
                                            {item.brand_name}
                                        </strong>
                                    </h6>
                                    <p className='card-title'>{item.sub_category_name}</p>
                                    <p className='card-title'>
                                        Price: <del className='text-danger'>₹ 6000</del> <span>₹ 5000</span>
                                    </p>
                                    <div className='my-3'>
                                        <input type="submit" value={'Buy Now'} className='w-100 my-btn text-decoration-none' onClick={() => { goToNext(item._id) }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    isActive={activeCollapsibles[index]}
                    toggleCollapsible={() => toggleCollapsible(index)}
                />
            ))}
        </>
    );
}

export default MobileCollapsible;
